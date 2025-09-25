import { IsNotEmpty } from "class-validator";

export class CheckCodeDTO {

    @IsNotEmpty({ message: "_id không được để trống" })
    _id: string;

    @IsNotEmpty({ message: "Code không được để trống" })
    codeId: string;
}
