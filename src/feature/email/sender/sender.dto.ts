export interface EmailSenderResponseDto {
  id: string,
  email: string,
  password: string,
  tag: string,
}

export interface EmailSenderRequestDto {
  email: string,
  password: string,
  tag: string,
}