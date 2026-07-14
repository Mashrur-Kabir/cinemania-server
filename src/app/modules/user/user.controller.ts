import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import { AppError } from "../../errors/AppError";

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

  if (id === req.user.id) {
    throw new AppError(
      status.FORBIDDEN,
      "You cannot change your own role. Ask another admin to do this for you.",
    );
  }

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

  if (id === req.user.id) {
    throw new AppError(
      status.FORBIDDEN,
      "You cannot change your own account status. Ask another admin to do this for you.",
    );
  }

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

  if (id === req.user.id) {
    throw new AppError(
      status.FORBIDDEN,
      "You cannot delete your own account from the admin panel.",
    );
  }

  await UserService.softDeleteUserFromDB(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User moved to terminal state (Soft Deleted)",
    data: null,
  });
});

const getUserAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserAnalyticsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User analytics generated successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  changeRole,
  toggleStatus,
  deleteUser,
  getUserAnalytics,
};
