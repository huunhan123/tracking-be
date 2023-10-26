import { Expose, Type } from 'class-transformer';

import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class Queries {
  @IsOptional()
  @IsString()
  @IsIn([
    'ram',
    'cpu',
    'psu',
    'ssd',
    'hdd',
    'mouse',
    'keyboard',
    'mainboard',
    'vga',
  ])
  category?: string;

  @IsOptional()
  @IsNotEmpty()
  vendor?: string;

  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @ValidateIf((obj, value) => value != undefined || obj.orderType)
  @IsNotEmpty()
  @Expose({ name: 'order-by' })
  orderBy?: string;

  @ValidateIf((obj, value) => value != undefined || obj.orderBy)
  @IsIn(['asc', 'desc'])
  @Expose({ name: 'order-type' })
  orderType?: 'asc' | 'desc';

  @ValidateIf((obj, value) => value != undefined || obj.rpp)
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ValidateIf((obj, value) => value != undefined || obj.page)
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  rpp?: number;
}
