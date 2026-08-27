import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// @ts-ignore
import { Strategy as TikTokStrategy } from 'passport-tiktok-auth';
import prisma from './prisma';
import logger from '../utils/logger';

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Social Auth Handler
const handleSocialLogin = async (
    provider: string,
    providerId: string,
    email: string | undefined | null,
    displayName: string,
    avatar: string | undefined,
    done: any
) => {
    try {
        if (!email && provider === 'google') {
            return done(new Error('No email found from provider'), false);
        }

        // 1. Check if social account exists
        const existingSocial = await prisma.socialAccount.findUnique({
            where: {
                provider_providerId: {
                    provider,
                    providerId
                }
            },
            include: { user: true }
        });

        if (existingSocial) {
            return done(null, existingSocial.user);
        }

        let user;

        // 2. Start Transaction to ensure consistency
        // If email exists, link it. If not, create new user.
        // Note: Some providers like TikTok might not provide email easily without advanced permissions.
        // If no email, we force create a new account or require mapping?
        // For now, if no email, we generate a placeholder email: `id@provider.social`

        const effectiveEmail = email || `${providerId}@${provider}.social`;

        const existingUser = await prisma.user.findUnique({
            where: { email: effectiveEmail }
        });

        if (existingUser) {
            user = existingUser;
            // Existing user found (via email), just link social account
        } else {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email: effectiveEmail,
                    fullName: displayName,
                    avatar: avatar,
                    role: {
                        connect: { name: 'User' }
                    }
                }
            });
        }

        // 3. Create Social Account Link
        await prisma.socialAccount.create({
            data: {
                userId: user.id,
                provider,
                providerId,
                email: effectiveEmail,
                avatar
            }
        });

        return done(null, user);

    } catch (error) {
        logger.error(`${provider} Auth Error:`, error);
        return done(error, false);
    }
};

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${API_URL}/api/v1/auth/google/callback`,
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0]?.value;
        const photo = profile.photos?.[0]?.value;
        await handleSocialLogin('google', profile.id, email, profile.displayName, photo, done);
    }));
} else {
    logger.warn('Google Auth skipped: Missing GOOGLE_CLIENT_ID/SECRET');
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${API_URL}/api/v1/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
    }, async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails?.[0]?.value;
        const photo = profile.photos?.[0]?.value;
        const displayName = profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}`;
        await handleSocialLogin('facebook', profile.id, email, displayName, photo, done);
    }));
} else {
    logger.warn('Facebook Auth skipped: Missing FACEBOOK_APP_ID/SECRET');
}

// TikTok Strategy
if (process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET) {
    passport.use(new TikTokStrategy({
        clientKey: process.env.TIKTOK_CLIENT_KEY,
        clientSecret: process.env.TIKTOK_CLIENT_SECRET,
        callbackURL: `${API_URL}/api/v1/auth/tiktok/callback`,
        scope: ['user.info.basic']
    }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        // Mapping might differ based on library version, ensure safety
        const photo = profile.avatar_url || profile.data?.avatar_url;
        const displayName = profile.display_name || profile.data?.display_name;
        // TikTok ID is usually in data.open_id or similar
        const id = profile.id || profile.data?.open_id;

        await handleSocialLogin('tiktok', id, null, displayName, photo, done);
    }));
} else {
    logger.warn('TikTok Auth skipped: Missing TIKTOK_CLIENT_KEY/SECRET');
}

export default passport;
