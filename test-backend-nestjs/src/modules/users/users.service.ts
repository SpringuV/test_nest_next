import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from 'src/utils/helper';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,

    ) { }
    isEmailExist = async (email: string) => {
        const user = await this.userModel.exists({ email: email })
        if (user) return true;
        return false;
    }

    async create(createUserDto: CreateUserDto) {

        const { name, email, password, phone, address, age, image } = createUserDto
        // check email
        const isExist = await this.isEmailExist(email)
        if (isExist) {
            throw new BadRequestException(`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác`)
        }
        // hash password
        const hashPassword = await hashPasswordHelper(password)
        const user = await this.userModel.create({
            name, email, password: hashPassword, phone, address, age, image
        })

        return user.save()
    }

    async findAll(query: string, current: number, pageSize: number) {
        const { filter, sort } = aqp(query)
        if(filter.current) delete filter.current
        if(filter.pageSize) delete filter.pageSize
        console.log(filter)
        if (!current) current = 1
        if (!pageSize) pageSize = 10

        const totalItems = (await this.userModel.find(filter)).length
        const totalPages = Math.ceil(totalItems / pageSize)
        const skip = (current - 1) * (pageSize)

        const results = await this.userModel
            .find(filter)
            .limit(pageSize)
            .skip(skip)
            .sort(sort as any)
        return {results, totalPages}
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
