import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateChatMessageDto {
    @IsNotEmpty()
    @IsInt()
    tableId: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    message: string;
}
