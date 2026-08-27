import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

const ERPNextDocTypes = [
  'Patient',
  'Healthcare Practitioner',
  'Patient Appointment',
  'Patient Encounter',
  'Sales Invoice',
  'Item',
] as const;

export class ErpNextRequestContextDto {
  @IsString()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  facilityId!: string;

  @IsString()
  @IsNotEmpty()
  sourceSystem!: string;

  @IsString()
  @IsNotEmpty()
  sourceId!: string;

  @IsString()
  @IsNotEmpty()
  idempotencyKey!: string;
}

export class ErpNextUpsertDto {
  @IsIn(ERPNextDocTypes)
  doctype!: (typeof ERPNextDocTypes)[number];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsObject()
  data!: Record<string, unknown>;

  @ValidateNested()
  @Type(() => ErpNextRequestContextDto)
  context!: ErpNextRequestContextDto;
}
