import moment from 'moment';
import 'moment-timezone';

import { config } from './app.config';

// Sets the default timezone for Date object to UTC GMT+0000
process.env.TZ = 'Etc/Universal';

moment.tz.setDefault(config.app.timeZone);
