export interface EmailSubjectResponseDto {
  id: string,
  subject: string,
  greeting: boolean,
  tag: string,
}

export interface EmailSubjectRequestDto {
  subject: string,
  greeting: boolean,
  tag: string,
}