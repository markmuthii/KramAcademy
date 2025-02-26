export interface ISerializedError {
  message: string;
  field?: string;
}

export interface IAPIResponse<T> {
  success: boolean;
  data: T[] | T;
}
