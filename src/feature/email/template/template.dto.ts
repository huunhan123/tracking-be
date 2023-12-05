export interface EmailTemplateResponseDto {
  id: string,
  name: string,
  url: string,
  tag: string,
}

export interface EmailTemplateRequestDto {
  name: string,
  content: string,
  tag: string,
}