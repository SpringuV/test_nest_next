import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { comparePasswordHelper } from 'src/utils/helper';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CheckCodeDTO } from './dto/check-code.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) { }

	async login(user: any) {
		const payload = { email: user.email, sub: user._id }
		return {
			access_token: this.jwtService.sign(payload),
			user: {
				_id: user._id,
				email: user.email,
				name: user.name,
				// role: user.role, // Thêm role nếu có
			}
		}
	}

	async validateUser(emailOrUsername: string, pass: string): Promise<any> {
		try {
			// Tìm user bằng email (vì frontend gửi email qua username field)
			const user = await this.usersService.findByEmail(emailOrUsername);

			if (!user) {
				console.log('User not found with email:', emailOrUsername);
				throw new UnauthorizedException("Không thể tìm thấy người dùng")
			}

			const isValidPassword = await comparePasswordHelper(pass, user.password);
			if (!isValidPassword) {
				console.log('Invalid password for user:', emailOrUsername);
				throw new UnauthorizedException("Email/Password không hợp lệ");
			}

			if (user.isActive === false) {
				console.log('User account is inactive:', emailOrUsername);
				throw new BadRequestException("Tài khoản chưa được kích hoạt")
			}

			console.log('User validation successful:', { id: user._id, email: user.email });
			return user;
		} catch (error) {
			console.error('validateUser error:', error.message);
			throw error;
		}
	}

	handleRegister = async (registerDTO: CreateAuthDto) => {
		return await this.usersService.handleRegister(registerDTO)
	}

	checkCodeVerify = async (data: CheckCodeDTO)=>{
		return await this.usersService.handleActive(data)
	}  
}
