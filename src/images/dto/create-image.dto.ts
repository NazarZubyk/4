import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateImageDto {
    
    @ApiProperty({ type: 'string', format: 'binary' })
    readonly image: File;

    @IsString()
    @IsNotEmpty()
    readonly personeName: string;

    
}
