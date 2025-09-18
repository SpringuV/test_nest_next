import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({ message: "_id không hợp lệ" })
    @IsNotEmpty({ message: "_id không được để trống" })
    _id: string;

    @IsOptional()
    name: string;

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
