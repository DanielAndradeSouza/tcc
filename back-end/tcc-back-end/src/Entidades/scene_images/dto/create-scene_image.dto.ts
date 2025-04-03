import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSceneImageDto {
    @IsNotEmpty()
    @IsInt()
    sceneId: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    width: number;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsNumber()
    xPos: number;

    @IsNotEmpty()
    @IsNumber()
    yPos: number;

    @IsNotEmpty()
    @IsNumber()
    rotation: number;

    @IsNotEmpty()
    @IsString()
    layer: string;
}
