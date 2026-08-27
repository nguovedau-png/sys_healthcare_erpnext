import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
  userId: string;
  email: string;
  password: string;
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

    try {
      return this.generateToken(user);
    } catch (err) {
      console.error('Error in generateToken:', err);
      throw err;
    }
  }

  async register(email: string, password: string) {
    const user = await this.userClient
      .send({ cmd: 'createUser' }, { email, password })
      .toPromise();
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.userId };
    // Exclude password from the returned user object
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }
}
