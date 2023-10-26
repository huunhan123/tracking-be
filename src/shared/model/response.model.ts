export interface ResponseModel<T> {
  data: T;
  message?: string;
  metadata?: {
    totalRows: number,
  }
}
