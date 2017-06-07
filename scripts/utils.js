import { exec } from 'child_process';
import { readFileSync } from 'fs';

export const TMP_DIR = '.tzdata';
export const MOMENT_TZ_URL = 'https://raw.githubusercontent.com/moment/moment-timezone/develop/data/packed/latest.json';
export const TZ_DB_PATH = `${TMP_DIR}/tz-database.json`;

export const TZ_TAR_GZ = 'tzdata-latest.tar.gz';
export const TZ_URL = `https://www.ietf.org/timezones/${TZ_TAR_GZ}`;

export const DATA_DIR = 'src/data';


export const execute = (command) => new Promise((resolve) => exec(command, resolve));
export const readFile = readFileSync;
export { basename, dirname } from 'path';
