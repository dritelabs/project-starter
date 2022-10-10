import {sendRedirect} from 'h3';
import {
  codeChallenge,
  codeVerifier,
  randomBytes,
} from '@dritelabs/accounts-utils';
import {withIronSession} from '~/lib/session';

export default withIronSession(async event => {
  const config = useRuntimeConfig();
  const state = randomBytes(16).toString('hex');
  const _codeVerifier = codeVerifier();
  const _codeChallenge = codeChallenge(
    _codeVerifier,
    config.codeChallengeMethod as 'plain' | 'S256'
  );

  const params = new URLSearchParams({
    client_id: config.clientId,
    code_challenge: _codeChallenge,
    code_challenge_method: config.codeChallengeMethod,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    resource: config.resource,
    scope: config.scope,
    state,
  });

  // params.append("resource", "http://localhost:3000");
  // params.append("resource", config.resource);

  await event.req.session.destroy();

  event.req.session.code_verifier = _codeVerifier;
  event.req.session.state = state;

  await event.req.session.save();

  return sendRedirect(event, `${config.authorizationEndpoint}?${params}`);
});
