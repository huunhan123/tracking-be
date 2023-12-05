export interface EmailDestinationResponseDto {
  id: string,
  name: string,
  email: string,
  tag: string,
}


export interface EmailDestinationRequestDto {
  name: string,
  email: string,
  tag: string,
}