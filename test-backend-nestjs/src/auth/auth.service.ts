import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { comparePasswordHelper } from 'src/utils/helper';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user == null) {
      throw new UnauthorizedException("Không thể tìm thấy người dùng")
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException("Username/Password không hợp lệ");
    }
    if (user.isActive === false) {
      throw new BadRequestException("Tài khoản chưa được kích hoạt")
    }
    return user
  }

  handleRegister = async (registerDTO: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDTO)
  }
}
