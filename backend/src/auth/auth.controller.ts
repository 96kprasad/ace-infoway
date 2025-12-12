import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    console.log('📝 Register API Request:', body);
    
    // Extract data if wrapped in data object
    const data = body.data || body;
    
    // Clean email - remove mailto: prefix
    if (data.email && data.email.includes('mailto:')) {
      data.email = data.email.replace(/mailto:/g, '');
    }
    
    const registerDto: RegisterDto = {
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      password: data.password
    };
    
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() body: any) {
    console.log('🔐 Login API Request:', body);
    
    // Extract data if wrapped in data object
    const data = body.data || body;
    
    // Clean email - remove mailto: prefix
    if (data.email && data.email.includes('mailto:')) {
      data.email = data.email.replace(/mailto:/g, '');
    }
    
    const loginDto: LoginDto = {
      email: data.email,
      password: data.password
    };
    
    return this.authService.login(loginDto);
  }
}