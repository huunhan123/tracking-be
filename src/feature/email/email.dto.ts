import { IsOptional, IsString } from "class-validator"

export class EmailRequestDto {
  @IsString()
  @IsOptional()
  templateName: string;

  @IsOptional()
  @IsString()
  subject: string;
}

