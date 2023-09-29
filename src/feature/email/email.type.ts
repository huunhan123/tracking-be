export type EmailSender = {
  email: string,
  password: string,
}

export type EmailTemplate = {
  name: string,
  url: string,
}

export type Destination = {
  id: number,
  name: string,
  email: string,
}

export type UserInfo = {
  name: string,
  email: string,
}