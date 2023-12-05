export interface EmailSubjectResponseDto {
  id: string,
  subject: string,
  type: string,
  tag: string,
}

export interface EmailSubjectRequestDto {
  subject: string,
  type: string,
  tag: string,
}