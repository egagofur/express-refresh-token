import { User } from "@prisma/client";
import prisma from "../utils/prisma";

export const findUser = async (payload: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload,
    },
  });
  return user;
};

export const createUser = async (payload: User) => {
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    },
  });

  return user;
};
