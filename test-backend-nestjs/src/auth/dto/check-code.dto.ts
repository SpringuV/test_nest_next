import { IsNotEmpty, IsOptional } from "class-validator";

export class CheckCodeDTO {

    @IsNotEmpty({ message: "_id không được để trống" })
    @IsOptional()
    _id: string;

    @IsNotEmpty({ message: "email không được để trống" })
    @IsOptional()
    email: string;

    @IsNotEmpty({ message: "Code không được để trống" })
    codeId: string;
}
