export interface EmailLinkResponseDto {
  id: string,
  link: string,
  tag: string,
}

export interface EmailLinkRequestDto {
  link: string,
  tag: string,
}