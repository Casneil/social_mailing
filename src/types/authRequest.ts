import { User } from "@prisma/client";
import { Request } from "express";

export type AuthRequest = Request & { user?: User };