import { envVars } from "../../config/env";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";

export const seedAdmin = async () => {
  try {
    // 🔍 Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists. Skipping seed.");
      return;
    }

    console.log("🌱 Seeding admin...");

    // 🧑‍💻 Create admin using better-auth
    const admin = await auth.api.signUpEmail({
      body: {
        name: "Admin",
        email: envVars.ADMIN_EMAIL,
        password: envVars.ADMIN_PASSWORD,
        role: Role.ADMIN,
      },
    });

    // ✅ Mark email as verified
    await prisma.user.update({
      where: {
        id: admin.user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    console.log("🔥 Admin created successfully:", {
      email: envVars.ADMIN_EMAIL,
    });
  } catch (error) {
    console.error("❌ Error seeding admin:", error);

    // 🧹 Cleanup if something fails
    await prisma.user.deleteMany({
      where: {
        email: envVars.ADMIN_EMAIL,
      },
    });
  }
};
