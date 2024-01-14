export interface EmailSenderResponseDto {
  id: string,
  email: string,
  password: string,
  tag: string,
  nextTime: number,
}

export interface EmailSenderRequestDto {
  email: string,
  password: string,
  tag: string,
}