type ApiSuccessResponse<T> = {
  success: true;
  data: T | null;
};

type ApiErrorResponse<E = unknown> = {
  success: false;
  message: string;
  error?: E;
};

export type ApiResponsePayload<T, E = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse<E>;

export class ApiResponse {
  static success<T>(data: T): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static error<E = unknown>(message = "Error", error?: E): ApiErrorResponse<E> {
    return {
      success: false,
      message,
      error,
    };
  }
}
