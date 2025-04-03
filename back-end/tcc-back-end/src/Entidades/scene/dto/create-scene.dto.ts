import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateSceneDto {
    @IsNotEmpty()
    @IsInt()
    tableId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    width: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsOptional()
    @IsObject()
    tokens?: any; // JSON opcional para armazenar tokens
}
