import { authType } from "../types/auth.type";
import { createUser, findUser } from "./auth.repository";

export const checkEmail = async (payload: string) => {
  const user = await findUser(payload);
  return user;
};

export const registerUser = async (payload: authType) => {
  const user = await createUser(payload);

  return user;
};
