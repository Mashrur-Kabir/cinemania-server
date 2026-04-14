import { Request, Response } from "express";
import status from "http-status";
import { NotificationService } from "./notification.service";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const getMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const limit = Number(req.query.limit) || 20;

  const result = await NotificationService.getUserNotificationsFromDB(
    userId,
    limit,
  );
  const unreadCount = await NotificationService.getUnreadCountFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Notifications retrieved successfully",
    data: {
      notifications: result,
      unreadCount,
    },
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  await NotificationService.markAsReadInDB(userId, id as string);

  // 🎯 Refinement: Fetch new count immediately
  const unreadCount = await NotificationService.getUnreadCountFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Notification marked as read",
    data: { unreadCount }, // Return the new count
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const unreadCount = await NotificationService.markAllAsReadInDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All notifications marked as read",
    data: { unreadCount },
  });
});

export const NotificationController = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
