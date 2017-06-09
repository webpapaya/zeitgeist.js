import { execute, TMP_DIR, DATA_DIR } from './utils';
import updateTzDatabase from './update-tz-database';
import updateLeapSeconds from './update-leapseconds';

Promise.resolve()
  .then(() => execute(`mkdir -p ${DATA_DIR}`))
  .then(() => execute(`mkdir -p ${TMP_DIR}`))
  .then(() => Promise.all([
    updateTzDatabase(),
    updateLeapSeconds(),
  ]))
  .then(() => execute(`rm -r ${TMP_DIR}`))
  .catch((error) => console.log(error));
