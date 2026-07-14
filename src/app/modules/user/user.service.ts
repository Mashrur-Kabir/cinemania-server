/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userFilterableFields, userSearchableFields } from "./user.constants";
import { Role, UserStatus } from "./../../../generated/prisma/enums";
import status from "http-status";
import { AppError } from "../../errors/AppError";

const getAllUsersFromDB = async (query: Record<string, any>) => {
  const userQuery = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .fields();

  return await userQuery.execute();
};

const ensureNotLastAdmin = async (id: string) => {
  const remainingAdmins = await prisma.user.count({
    where: {
      role: Role.ADMIN,
      isDeleted: false,
      status: UserStatus.ACTIVE,
      id: { not: id },
    },
  });

  if (remainingAdmins === 0) {
    throw new AppError(
      status.FORBIDDEN,
      "This is the last active admin account — the action was blocked to prevent locking everyone out of the admin dashboard.",
    );
  }
};

const updateUserRole = async (id: string, role: Role) => {
  const target = await prisma.user.findUniqueOrThrow({ where: { id } });

  if (target.role === Role.ADMIN && role !== Role.ADMIN) {
    await ensureNotLastAdmin(id);
  }

  return await prisma.user.update({
    where: { id },
    data: { role },
  });
};

const updateUserStatus = async (id: string, newStatus: UserStatus) => {
  const target = await prisma.user.findUniqueOrThrow({ where: { id } });

  if (target.role === Role.ADMIN && newStatus !== UserStatus.ACTIVE) {
    await ensureNotLastAdmin(id);
  }

  return await prisma.user.update({
    where: { id },
    data: { status: newStatus },
  });
};

const softDeleteUserFromDB = async (id: string) => {
  const target = await prisma.user.findUniqueOrThrow({ where: { id } });

  if (target.role === Role.ADMIN) {
    await ensureNotLastAdmin(id);
  }

  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      status: UserStatus.BLOCKED, // Block immediately on delete
      deletedAt: new Date(),
    },
  });
};

const getUserAnalyticsFromDB = async () => {
  const [totalUsers, activeUsers, blockedUsers, adminUsers, standardUsers] =
    await Promise.all([
      prisma.user.count({ where: { isDeleted: false } }),
      prisma.user.count({ where: { status: "ACTIVE", isDeleted: false } }),
      prisma.user.count({ where: { status: "BLOCKED", isDeleted: false } }),
      prisma.user.count({ where: { role: "ADMIN", isDeleted: false } }),
      prisma.user.count({ where: { role: "USER", isDeleted: false } }),
    ]);

  // 📈 Calculate Registration Growth (Last 6 Months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1); // Start of that month

  const recentUsers = await prisma.user.findMany({
    where: { createdAt: { gte: sixMonthsAgo }, isDeleted: false },
    select: { createdAt: true },
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const growthMap: Record<string, number> = {};

  // Initialize last 6 months with 0
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    growthMap[`${months[d.getMonth()]} ${d.getFullYear()}`] = 0;
  }

  // Populate data
  recentUsers.forEach((u) => {
    const key = `${months[u.createdAt.getMonth()]} ${u.createdAt.getFullYear()}`;
    if (growthMap[key] !== undefined) growthMap[key]++;
  });

  const growthData = Object.entries(growthMap).map(([month, count]) => ({
    month,
    count,
  }));

  return {
    overview: { totalUsers, activeUsers, blockedUsers, adminUsers },
    statusDistribution: [
      { name: "Active", value: activeUsers },
      { name: "Blocked", value: blockedUsers },
    ],
    roleDistribution: [
      { name: "Admin", value: adminUsers },
      { name: "User", value: standardUsers },
    ],
    growthData,
  };
};

export const UserService = {
  getAllUsersFromDB,
  updateUserRole,
  updateUserStatus,
  softDeleteUserFromDB,
  getUserAnalyticsFromDB,
};
