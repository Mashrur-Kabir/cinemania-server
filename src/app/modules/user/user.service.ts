/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userFilterableFields, userSearchableFields } from "./user.constants";
import { Role, UserStatus } from "./../../../generated/prisma/enums";

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

const updateUserRole = async (id: string, role: Role) => {
  return await prisma.user.update({
    where: { id },
    data: { role },
  });
};

const updateUserStatus = async (id: string, status: UserStatus) => {
  return await prisma.user.update({
    where: { id },
    data: { status },
  });
};

const softDeleteUserFromDB = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      status: UserStatus.BLOCKED, // Block immediately on delete
      deletedAt: new Date(),
    },
  });
};

export const UserService = {
  getAllUsersFromDB,
  updateUserRole,
  updateUserStatus,
  softDeleteUserFromDB,
};
