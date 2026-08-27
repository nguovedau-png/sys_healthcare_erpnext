import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
  userId: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

@Injectable()
export class PasswordAuthService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.userClient
      .send({ cmd: 'getUserByEmail' }, email)
      .toPromise();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async register(email: string, password: string) {
    const user = await this.userClient
      .send({ cmd: 'createUser' }, { email, password })
      .toPromise();
    return this.generateToken(user);
  }

  async refresh(refreshToken: string) {
    if (typeof refreshToken !== 'string' || refreshToken.length < 20 || refreshToken.length > 4096) {
      throw new Error('Invalid refresh token');
    }
    try {
      const payload = this.jwtService.verify<{ sub?: string }>(refreshToken);
      if (!payload.sub) throw new Error('Missing subject');
      const accessToken = this.jwtService.sign({ sub: payload.sub });
      return { accessToken, access_token: accessToken, tokenType: 'Bearer', expiresIn: 3600 };
    } catch {
      throw new Error('Invalid refresh token');
    }
  }

  private generateToken(user: User) {
    const payload = { sub: user.userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const { password, ...result } = user;
    return {
      accessToken,
      access_token: accessToken,
      refreshToken,
      user: result,
      tokenType: 'Bearer',
      expiresIn: 3600,
    };
  }
}
