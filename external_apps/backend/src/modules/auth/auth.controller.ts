import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.refreshToken(refreshToken);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    static async setup2FA(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const result = await AuthService.setup2FA(userId);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async verify2FA(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { code } = req.body;
            const result = await AuthService.verifyAndEnable2FA(userId, code);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async changePassword(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const result = await AuthService.changePassword(userId, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const result = await AuthService.forgotPassword(email);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const result = await AuthService.resetPassword(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async socialCallback(req: Request, res: Response) {
        try {
            const user = req.user;
            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
            }

            const tokens = await AuthService.generateSocialTokens(user);

            // Redirect with tokens (In production, consider a more secure way or a bridge page)
            // For Mobile (Expo): We might use a custom scheme, but web redirect works if using WebBrowser
            // url?accessToken=...&refreshToken=...
            const redirectUrl = `${process.env.FRONTEND_URL}/auth/social?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;

            res.redirect(redirectUrl);
        } catch (error: any) {
            res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(error.message)}`);
        }
    }

    static async registerPushToken(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { token } = req.body;
            await AuthService.updatePushToken(userId, token);
            res.status(200).json({ success: true, message: 'Push token updated' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
