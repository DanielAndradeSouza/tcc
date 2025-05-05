import { Exclude } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTableDto {
    @IsNotEmpty()
    @IsString()
    tableName: string;
    @IsOptional()
    @IsString()
    description?: string;
    @Exclude()
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
