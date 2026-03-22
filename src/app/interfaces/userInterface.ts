import { Role, UserStatus } from "../../generated/prisma/enums";

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  emailVerified: boolean;
  status: UserStatus; // Made required for strict JWT payloads
  isDeleted: boolean; // Made required
  image?: string | null;
}
