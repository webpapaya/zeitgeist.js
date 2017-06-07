import { exec } from 'child_process';
import { readFileSync } from 'fs';

export const MOMENT_TZ_URL = 'https://raw.githubusercontent.com/moment/moment-timezone/develop/data/packed/latest.json';
export const TMP_URL = '.tzdata';
export const TZ_DB_PATH = `${TMP_URL}/tz-database.json`;

export const execute = (command) => new Promise((resolve) => exec(command, resolve));
export const readFile = readFileSync;
export { basename, dirname } from 'path';
