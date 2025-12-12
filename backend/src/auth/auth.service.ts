import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      console.log('✅ Processing registration for:', registerDto.email);
      const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });
      if (existingUser) {
        console.log('❌ Registration failed - Email exists:', registerDto.email);
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = this.userRepository.create({
        full_name: registerDto.full_name,
        email: registerDto.email,
        phone: registerDto.phone,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      console.log('✅ User registered successfully:', registerDto.email);
      return { message: 'User registered successfully', data: null };
    } catch (error) {
      console.error('🚨 Register API Error:', error.message);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      console.log('✅ Processing login for:', loginDto.email);
      const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
      if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        console.log('❌ Login failed - Invalid credentials:', loginDto.email);
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email };
      console.log('✅ Login successful for:', loginDto.email);
      return {
        message: 'Login successful',
        data: {
          access_token: this.jwtService.sign(payload),
          user: { id: user.id, email: user.email, full_name: user.full_name },
        }
      };
    } catch (error) {
      console.error('🚨 Login API Error:', error.message);
      throw error;
    }
  }
}