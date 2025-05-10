import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    console.log('Đã nhận login request:', body); 
    return this.authService.login(body.email, body.password);
  }
}
