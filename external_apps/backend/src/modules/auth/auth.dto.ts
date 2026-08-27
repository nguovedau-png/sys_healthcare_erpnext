import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @IsNotEmpty()
    fullName!: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsString()
    code?: string;
}
