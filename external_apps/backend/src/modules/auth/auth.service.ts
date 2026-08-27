import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';
import { signToken, signRefreshToken, verifyRefreshToken, verifyToken } from '../../utils/jwt';
import { generateTwoFactorSecret, generateQRCode, verifyTwoFactorToken } from '../../utils/totp';
import { sendEmail } from '../notification/email.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { User } from '@prisma/client';

export class AuthService {

    static async register(data: any) {
        const { email, password, fullName } = data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Default permission: User role. Ideally finding a role named "User" or creating it if not exists.
        // For simplicity, let's assume we seed roles later or handle null.
        // Or better, create a default role if none exists.

        // Check if role 'User' exists
        let userRole = await prisma.role.findUnique({ where: { name: 'User' } });
        if (!userRole) {
            // Create User role if not exists (handling this on the fly for better DX)
            userRole = await prisma.role.create({
                data: { name: 'User', description: 'Default user role' }
            });
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                roleId: userRole.id
            },
        });

        return user;
    }

    static async login(data: any) {
        const { email, password, code, tempToken } = data;

        let user;
        if (tempToken) {
            const decoded: any = verifyToken(tempToken);
            if (!decoded || !decoded.scope || decoded.scope !== '2fa_login') {
                throw new Error('Invalid or expired 2FA session');
            }
            user = await prisma.user.findUnique({ where: { id: decoded.userId }, include: { role: true } });
        } else {
            user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            if (!user.password) {
                throw new Error('Please login with social account');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
        }

        if (!user) throw new Error('User not found');

        if (user.is2FAEnabled) {
            if (!code) {
                const tempToken = signToken({ userId: user.id, scope: '2fa_login' }, { expiresIn: '5m' });
                return { require2FA: true, tempToken };
            }
            const verified = verifyTwoFactorToken(code, user.twoFactorSecret!);
            if (!verified) {
                throw new Error('Invalid 2FA code');
            }
        }

        const accessToken = signToken({ userId: user.id, role: user.role?.name });
        const refreshToken = signRefreshToken({ userId: user.id });

        // Update refresh token in DB
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken, lastLoginAt: new Date() },
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role?.name,
                avatar: user.avatar
            },
            accessToken,
            refreshToken,
        };
    }

    static async refreshToken(token: string) {
        const decoded: any = verifyRefreshToken(token);
        if (!decoded) {
            throw new Error('Invalid refresh token');
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, include: { role: true } });
        if (!user || user.refreshToken !== token) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = signToken({ userId: user.id, role: user.role?.name }); // role might need inclusion again if needed
        // Typically we don't rotate refresh token on every access token refresh, but can do.

        return { accessToken: newAccessToken };
    }

    static async setup2FA(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        const { secret, otpauth } = generateTwoFactorSecret(user.email);
        const qrCode = await generateQRCode(otpauth);

        // Save secret temporarily or permanently? Usually handled in 2 steps: generate -> verify -> enable.
        // For simplicity, we update secret but don't enable it yet.
        await prisma.user.update({
            where: { id: userId },
            data: { twoFactorSecret: secret },
        });

        return { secret, qrCode };
    }

    static async verifyAndEnable2FA(userId: string, code: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.twoFactorSecret) throw new Error('2FA setup not initiated');

        const verified = verifyTwoFactorToken(code, user.twoFactorSecret);
        if (!verified) throw new Error('Invalid 2FA code');

        await prisma.user.update({
            where: { id: userId },
            data: { is2FAEnabled: true },
        });

        return { message: '2FA enabled successfully' };
    }

    static async disable2FA(userId: string) {
        await prisma.user.update({
            where: { id: userId },
            data: { is2FAEnabled: false, twoFactorSecret: null },
        });
        return { message: '2FA disabled' };
    }

    static async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const token = signToken({ userId: user.id, type: 'reset' }); // Short lived token
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await sendEmail(email, 'Reset Password', `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`);

        return { message: 'Password reset email sent' };
    }

    static async resetPassword(data: any) {
        const { token, newPassword } = data;

        let decoded: any;
        try {
            decoded = verifyToken(token);
        } catch (e) {
            throw new Error('Invalid or expired token');
        }

        if (!decoded || (decoded as any).type !== 'reset') {
            throw new Error('Invalid token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: (decoded as any).userId },
            data: { password: hashedPassword },
        });

        return { message: 'Password reset successfully' };
    }
    static async generateSocialTokens(user: any) {
        // Ensure role is loaded if not already
        if (!user.role) {
            const userWithRole = await prisma.user.findUnique({ where: { id: user.id }, include: { role: true } });
            user.role = userWithRole?.role;
        }

        const accessToken = signToken({ userId: user.id, role: user.role?.name });
        const refreshToken = signRefreshToken({ userId: user.id });

        // Update refresh token in DB
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken, lastLoginAt: new Date() },
        });

        return {
            accessToken,
            refreshToken
        };
    }
    static async updatePushToken(userId: string, token: string) {
        await prisma.user.update({
            where: { id: userId },
            data: { pushToken: token }
        });
    }

    static async changePassword(userId: string, data: any) {
        const { currentPassword, newPassword } = data;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.password) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) throw new Error('Incorrect current password');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return { message: 'Password changed successfully' };
    }
}
