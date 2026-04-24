import { envVars } from "../../config/env";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import { logger } from "better-auth";

export const seedAdmin = async () => {
  try {
    // 🔍 Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN,
      },
    });

    if (existingAdmin) {
      logger.info("Admin already exists. Skipping seed.");
      return;
    }

    logger.info("🌱 Seeding admin...");

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
        status: UserStatus.ACTIVE,
      },
    });

    logger.success(`Admin created successfully: ${envVars.ADMIN_EMAIL}`);
  } catch (error) {
    logger.error("Error seeding admin", error);

    // 🧹 Cleanup if something fails
    await prisma.user.deleteMany({
      where: {
        email: envVars.ADMIN_EMAIL,
      },
    });
  }
};
