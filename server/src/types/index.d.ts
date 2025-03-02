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
