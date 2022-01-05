import { ApiProperty } from "@nestjs/swagger";

export class CreateDesafio45Dto{
    @ApiProperty()
    readonly name: String;
    @ApiProperty()
    readonly age: number;
    @ApiProperty()
    readonly breed: String;
}