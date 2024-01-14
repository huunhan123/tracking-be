export interface EmailLinkResponseDto {
  id: string,
  info: string,
  link: string,
  tag: string,
}

export interface EmailLinkRequestDto {
  info: string,
  link: string,
  tag: string,
}