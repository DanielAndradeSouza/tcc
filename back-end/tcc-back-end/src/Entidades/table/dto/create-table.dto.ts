import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    @IsString()
    tableName: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
