export interface authType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "REGULAR";
  createdAt: Date;
  updatedAt: Date;
}
