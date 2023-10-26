export interface EmailSenderResponseDto {
  id: string,
  email: string,
  password: string,
}

export interface EmailSenderRequestDto {
  email: string,
  password: string,
}