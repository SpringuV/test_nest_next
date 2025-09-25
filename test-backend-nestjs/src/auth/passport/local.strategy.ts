import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // NextAuth gửi với key 'username'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('LocalStrategy validate called with:', { username, password: '***' });

    try {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      console.log('User validated successfully:', { id: user._id, email: user.email });
      return user;
    } catch (error) {
      console.error('LocalStrategy validation error:', error.message);
      throw error;
    }
  }
}