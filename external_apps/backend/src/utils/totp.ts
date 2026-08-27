import { authenticator } from 'otplib';
import QRCode from 'qrcode';

const APP_NAME = process.env.TOTP_APP_NAME || 'HD_Template_App';

export const generateTwoFactorSecret = (email: string) => {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, APP_NAME, secret);
    return { secret, otpauth };
};

export const generateQRCode = async (otpauth: string) => {
    return await QRCode.toDataURL(otpauth);
};

export const verifyTwoFactorToken = (token: string, secret: string) => {
    return authenticator.verify({ token, secret });
};
