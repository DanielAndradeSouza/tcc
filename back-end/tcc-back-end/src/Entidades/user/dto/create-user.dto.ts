import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    creation_date: Date;

    @IsBoolean()
    active: boolean;

    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : null))
    @IsDate()
    deactivation_date?: Date;
}
