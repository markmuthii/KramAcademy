import { JwtPayload } from "jsonwebtoken";

export interface ISerializedError {
  message: string;
  field?: string;
}

export interface IAPIResponse<T> {
  success: boolean;
  data: T[] | T;
}

export interface IErrorResponse<T> {
  success: boolean;
  errors: T[];
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IJWTUser {
  _id: IUser["_id"];
}

// TJWTPayload which extends JWTPayload to include user
export interface IJWTPayload extends JwtPayload {
  user: IJWTUser;
}
