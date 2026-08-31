import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  GenerateRegistrationOptionsOpts,
  GenerateAuthenticationOptionsOpts,
} from '@simplewebauthn/server';

@Injectable()
export class PasskeyService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private jwtService: JwtService,
  ) { }

  async generateRegistrationOptions(
    userId: string,
  ): Promise<any> {
    const user = await this.userClient
      .send({ cmd: 'getUserById' }, userId)
      .toPromise();

    const opts: GenerateRegistrationOptionsOpts = {
      rpName: 'Your App',
      rpID: process.env.RP_ID || 'localhost',
      userID: user.userId,
      userName: user.email,
      attestationType: 'none',
      authenticatorSelection: {
        userVerification: 'preferred',
        residentKey: 'required',
      },
      supportedAlgorithmIDs: [-7, -257],
    };
    return generateRegistrationOptions(opts);
  }

  async verifyRegistration(userId: string, credential: any): Promise<boolean> {
    const user = await this.userClient
      .send({ cmd: 'getUserById' }, userId)
      .toPromise();

    try {
      const verification = await verifyRegistrationResponse({
        response: credential,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: process.env.EXPECTED_ORIGIN || 'http://localhost:3000',
        expectedRPID: process.env.RP_ID || 'localhost',
      });

      if (verification.verified) {
        await this.userClient
          .send(
            { cmd: 'updateUser' },
            {
              userId,
              passkey: JSON.stringify(verification.registrationInfo),
            },
          )
          .toPromise();
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  async generateAuthenticationOptions(
    userId: string,
  ): Promise<any> {
    const user = await this.userClient
      .send({ cmd: 'getUserById' }, userId)
      .toPromise();

    const opts: GenerateAuthenticationOptionsOpts = {
      rpID: process.env.RP_ID || 'localhost',
      allowCredentials: user.passkey ? [JSON.parse(user.passkey)] : [],
      userVerification: 'preferred',
    };
    return generateAuthenticationOptions(opts);
  }

  async verifyAuthentication(userId: string, credential: any): Promise<any> {
    const user = await this.userClient
      .send({ cmd: 'getUserById' }, userId)
      .toPromise();

    try {
      const verification = await verifyAuthenticationResponse({
        response: credential,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: process.env.EXPECTED_ORIGIN || 'http://localhost:3000',
        expectedRPID: process.env.RP_ID || 'localhost',
        authenticator: user.passkey ? JSON.parse(user.passkey) : undefined,
      });

      if (verification.verified) {
        return this.generateToken(user);
      }
    } catch (error) {
      console.error(error);
    }

    throw new Error('Authentication failed');
  }

  private generateToken(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
