import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateSceneDto {
    @IsNotEmpty()
    @IsInt()
    id: string;

    @IsNotEmpty()
    @IsString()
    width: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    x_pos: number;

    @IsOptional()
    @IsObject()
    y_pos: number; 

    @IsNotEmpty()
    @IsString()
    base64Content:string;
}
