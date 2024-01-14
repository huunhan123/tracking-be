export interface EmailProxyResponseDto {
  id: string,
  host: string,
  port: number,
  tag: string,
}

export interface EmailProxyRequestDto {
  host: string,
  port: number,
  tag: string,
}