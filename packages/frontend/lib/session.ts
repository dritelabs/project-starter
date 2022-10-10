import {CompatibilityEvent} from 'h3';
import type {IronSessionOptions} from 'iron-session';
import {withIronSessionApiRoute} from '@dritelabs/iron-session-h3';
import {useRuntimeConfig} from '#imports';

declare module 'iron-session' {
  interface IronSessionData {
    state: string;
    code_verifier: string;
    user?: {
      access_token: string;
      expires_in: number;
      id_token: string;
      refresh_token: string;
      token_type: string;
      scope: string;
    };
  }
}

const config = useRuntimeConfig();

export const options: IronSessionOptions = {
  cookieName: 'driten/developers',
  password: config.secretCookiePassword,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const withIronSession = <T>(
  handler: (event: CompatibilityEvent) => Promise<T>
) => withIronSessionApiRoute(handler, options);
