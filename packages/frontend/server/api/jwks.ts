import {readFileSync} from 'fs';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {withIronSession} from '~/lib/session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = readFileSync(join(__dirname, '../../config/public-key.json'));
const publicKey = JSON.parse(file.toString('utf-8'));

export default withIronSession(async () => {
  return {
    keys: [publicKey],
  };
});
