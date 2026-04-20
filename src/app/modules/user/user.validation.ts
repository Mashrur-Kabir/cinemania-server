import { z } from "zod";
import { Role, UserStatus } from "../../../generated/prisma/enums";

/**
 * 🛡️ USER MODULE VALIDATIONS
 * Ensures role and status updates match the defined cinematic multiverse enums.
 */
const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(Role, "Target role is required for escalation."),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(UserStatus, "Account status must be specified."),
  }),
});

export const UserValidation = {
  updateRoleSchema,
  updateStatusSchema,
};
