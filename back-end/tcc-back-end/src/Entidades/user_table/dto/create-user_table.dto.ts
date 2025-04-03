import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserTableDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    tableId: number;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsOptional()
    joinDate?: Date;
}
