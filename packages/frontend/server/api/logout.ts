import {sendRedirect} from 'h3';
import {withIronSession} from '~/lib/session';

export default withIronSession(async event => {
  await event.req.session.destroy();

  return sendRedirect(event, '/');
});
