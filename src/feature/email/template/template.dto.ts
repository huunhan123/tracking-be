export interface EmailTemplateResponseDto {
  id: string,
  name: string,
  url: string,
}

export interface EmailTemplateRequestDto {
  name: string,
  content: string,
}