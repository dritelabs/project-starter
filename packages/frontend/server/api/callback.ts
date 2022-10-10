import {getQuery, sendRedirect} from 'h3';
import {importJWK, signToken} from '@dritelabs/accounts-utils';
import {withIronSession} from '~/lib/session';

export default withIronSession(async event => {
  try {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const {code, state} = query;

    if (state === null || state !== event.req.session.state) {
      return {
        error: "The state doesn't match",
      };
    }

    const privatekey = await importJWK(config.privateKey);

    const clientAssertion = await signToken({
      audience: config.authorizationServerHost,
      exp: config.clientAssertionExpirationTime,
      issuer: config.host,
      key: privatekey,
      subject: config.clientId,
    });

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code_verifier: event.req.session.code_verifier,
      redirect_uri: config.redirectUri,
      code: code as string,
      client_assertion_type:
        'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: clientAssertion,
    });

    const response = await $fetch(config.tokenEndpoint, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    await event.req.session.destroy();

    event.req.session.user = response as any;

    await event.req.session.save();

    return sendRedirect(event, '/applications');
  } catch (error) {
    return error?.data;
  }
});
