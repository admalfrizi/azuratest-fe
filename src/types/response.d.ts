export interface ApiSuccessResponse{
  success: boolean;
  code: number;
  message: string;
}

interface PaginationDataResponse<T> extends ApiSuccessResponse {
  data: T;
  meta: Record<string, unknown>;
}