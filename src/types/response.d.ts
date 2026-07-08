export interface ApiSuccessResponse{
  success: boolean;
  code: number;
  message: string;
}

export interface Meta {
  page : number, 
  perPage : number, 
  totalPages: number,
  totalCount: number, 
}

interface PaginationDataResponse<T> extends ApiSuccessResponse {
  data: T;
  meta: Meta;
}