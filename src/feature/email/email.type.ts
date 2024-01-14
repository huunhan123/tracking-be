import { EmailDestinationModel } from './destination/destination.model'
import { EmailSubjectModel } from './subject/subject.model'
import { EmailTemplateModel } from './template/template.model'

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

export type MailOption = {
  sender: string,
  destination: EmailDestinationModel,
  subject: EmailSubjectModel,
  template: EmailTemplateModel,
  link: string,
  reportID: string,  
}