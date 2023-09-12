import { ProxyAgent } from 'proxy-agent'

export type MailInfo<T> = {
  to: string[],
  subject: string,
  context: T,
}

export type MailTransport = {
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string,
  proxy: boolean,
  agent: ProxyAgent,
}