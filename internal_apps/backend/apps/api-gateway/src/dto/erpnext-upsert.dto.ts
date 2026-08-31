import { Type } from 'class-transformer';
import {
  Equals,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export const ERPNextDocTypes = [
  'Customer',
  'Employee',
  'Healthcare Practitioner',
  'Item',
  'Lead',
  'Patient',
  'Patient Appointment',
  'Patient Encounter',
  'Payment Entry',
  'Purchase Invoice',
  'Sales Invoice',
  'Stock Entry',
  'Supplier',
  'Warehouse',
] as const;

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

export class ErpNextRequestContextDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Matches(SAFE_ID)
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Matches(SAFE_ID)
  facilityId!: string;

  @Equals('healthcare-platform')
  sourceSystem!: 'healthcare-platform';

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Matches(SAFE_ID)
  sourceId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Matches(SAFE_ID)
  idempotencyKey!: string;
}

export class ErpNextUpsertDto {
  @IsIn(ERPNextDocTypes)
  doctype!: (typeof ERPNextDocTypes)[number];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(140)
  @Matches(SAFE_ID)
  name?: string;

  @IsObject()
  data!: Record<string, unknown>;

  @ValidateNested()
  @Type(() => ErpNextRequestContextDto)
  context!: ErpNextRequestContextDto;
}
