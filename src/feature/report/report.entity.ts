export interface ReportEntity {
  _id: string,
  user: string,
  product: string,
  sender: string,
  template: string,
  opens: number[],
  sendAt: string,
}
