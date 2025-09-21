import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
 
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './auth.dto.register';
import { LoginDto } from './auth.dto.login';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
