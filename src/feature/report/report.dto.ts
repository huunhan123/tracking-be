export interface ReportResponseDto {
  id: string;
  user: string,
  product: string,
  sender: string,
  template: string,
}

export interface ReportRequestDto {
  user: string,
  product: string,
  sender: string,
  template: string,
  sendAt: string,
}
