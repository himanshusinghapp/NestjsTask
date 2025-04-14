import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) throw new UnauthorizedException('Email already exist');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      passsword: hash,
    });
    this.kafkaClient.emit('user_registered', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    return { message: 'User registered successfully', user };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passsword);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
