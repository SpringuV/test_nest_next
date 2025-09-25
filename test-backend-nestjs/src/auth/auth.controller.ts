import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckCodeDTO } from './dto/check-code.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailerService: MailerService,
    ) { }

    @Post("login")
    @Public()
    @UseGuards(LocalAuthGuard)
    handleLogin(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post("check-code")
    @Public()
    checkCode(@Body() checkCode: CheckCodeDTO) {
        return this.authService.checkCodeVerify(checkCode)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }

    @Post('register')
    @Public()
    register(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.handleRegister(createAuthDto)
    }

    @Get('mail')
    @Public()
    testMail() {
        return this.mailerService.sendMail({
            to: 'xuanvuaudi2002@gmail.com',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            template: 'register.hbs',
            context: {
                name: "spring vu",
                activationCode: 123456
            }
        });
    }
}
