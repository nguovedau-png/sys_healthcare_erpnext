import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class ErpNextSyncOperationsQueryDto {
  @IsString()
  @Length(1, 128)
  tenantId!: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  facilityId?: string;

  @IsOptional()
  @IsIn(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'DEAD_LETTER'])
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100_000)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;
}
