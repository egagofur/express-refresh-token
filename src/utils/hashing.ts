import bcrypt from "bcrypt";

// endocde password
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

// decode password
export const comparePassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword);
};
