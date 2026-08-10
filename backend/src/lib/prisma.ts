import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export function getPrisma(accelerateUrl: string) {
  return new PrismaClient({ accelerateUrl }).$extends(withAccelerate());
}
