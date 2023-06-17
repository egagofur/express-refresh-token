import jwt from "jsonwebtoken";
import config from "./config";

const accessKey = config.accessKey || "";

export const signJWT = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, accessKey, {
    ...(options && options),
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decode = jwt.verify(token, accessKey);
    return {
      valid: true,
      expired: false,
      decode,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decode: null,
    };
  }
};
