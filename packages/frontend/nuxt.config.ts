import {readFileSync} from 'fs';
import {join} from 'path';

const privateFile = readFileSync(join(__dirname, './config/private-key.json'));
const publicFile = readFileSync(join(__dirname, './config/public-key.json'));
const privateKey = JSON.parse(privateFile.toString('utf-8'));
const publicKey = JSON.parse(publicFile.toString('utf-8'));
const port = process.env.PORT || 3000;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vueuse/nuxt'],
  // colorMode: {
  //   preference: "light", // default theme
  //   dataValue: "light", // activate data-theme in <html> tag
  //   classSuffix: "",
  // },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
    ],
  },
  runtimeConfig: {
    authorizationServerHost:
      process.env.AUTHORIZATION_SERVER_HOST || 'http://localhost:3000',
    authorizationEndpoint:
      process.env.AUTHORIZATION_ENDPOINT || 'http://localhost:3000/authorize',
    clientId: process.env.CLIENT_ID || 'cl05amov600137o9kit49f4cz',
    clientAssertionExpirationTime:
      process.env.CLIENT_ASSERTION_EXPIRATION_TIME || '60',
    codeChallengeMethod: process.env.CODE_CHALLENGE_METHOD || 'S256',
    host: process.env.HOST || `http://localhost:${port}`,
    redirectUri:
      process.env.REDIRECT_URI || `http://localhost:${port}/api/callback`,
    scope: process.env.SCOPE || ['openid', 'profile', 'clients'].join(' '),
    resource: process.env.SERVER_HOST || 'localhost:5000',
    secretCookiePassword:
      process.env.SECRET_COOKIE_PASSWORD ||
      'complex_password_at_least_32_characters_long',
    tokenEndpoint:
      process.env.TOKEN_ENDPOINT || 'http://localhost:3000/api/token',
    privateKey,
    publicKey,
  },
  typescript: {
    shim: false,
  },
});
