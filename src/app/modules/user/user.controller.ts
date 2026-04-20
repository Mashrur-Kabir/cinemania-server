import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User base retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUserRole(id as string, req.body.role);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User role updated",
    data: result,
  });
});

const toggleStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUserStatus(
    id as string,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User account status modified",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserService.softDeleteUserFromDB(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User moved to terminal state (Soft Deleted)",
    data: null,
  });
});

export const UserController = {
  getAllUsers,
  changeRole,
  toggleStatus,
  deleteUser,
};
