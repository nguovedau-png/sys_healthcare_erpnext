import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsISO8601, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator';

const APPOINTMENT_STATUSES = ['pending', 'confirmed', 'checked_in', 'in_progress', 'completed', 'cancelled', 'no_show'] as const;

export class CreateAppointmentDto {
  @IsString()
  @Length(2, 160)
  patientName!: string;

  @Matches(/^(?:\+84|84|0)(?:3|5|7|8|9)[\s().-]?\d{3}[\s.-]?\d{3}[\s.-]?\d{3}$/)
  patientPhone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  address?: string;

  @IsOptional()
  @IsISO8601()
  dob?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  sex?: string;

  @IsString()
  @Length(1, 120)
  doctorId!: string;

  @IsOptional()
  @IsString()
  @Length(1, 160)
  doctorName?: string;

  @IsISO8601()
  appointmentDate!: string;

  @IsOptional()
  @IsString()
  @Length(0, 64)
  date?: string;

  @IsOptional()
  @IsString()
  @Length(0, 32)
  time?: string;

  @IsOptional()
  @IsString()
  @Length(0, 160)
  service?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2_147_483_647)
  serviceId?: number;

  @IsOptional()
  @IsString()
  @Length(1, 32)
  type?: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  treatmentPlaceBooking?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  noExpected?: number;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  note?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  treatmentInfo?: string;

  // Appointment status is owned by the state machine. Clients create pending appointments
  // and use explicit lifecycle operations for subsequent transitions.
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
