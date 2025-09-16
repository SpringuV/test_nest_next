import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: "name không được để trống" })
    name: string;

    @IsNotEmpty({ message: "password không được để trống" })
    password: string;

    @IsNotEmpty({ message: "email không được để trống" })
    @IsEmail({}, { message: "email không đúng định dạng" })
    email: string;

    @IsOptional()
    @IsNumber({}, { message: 'age phải là số' })
    age?: number;

    @IsOptional()
    @IsString({ message: 'phone phải là chuỗi' })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'address phải là chuỗi' })
    address?: string;

    @IsOptional()
    @IsUrl({}, { message: 'image phải là URL hợp lệ' })
    image?: string;
}
