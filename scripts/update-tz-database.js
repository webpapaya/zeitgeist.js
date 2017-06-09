import {
  execute,
  readFile,
  basename,
  dirname,
  MOMENT_TZ_URL,
  TZ_DB_PATH,
} from './utils';

const updateTzDatabase = () => Promise.resolve()
  .then(() => execute(`mkdir -p ${dirname(TZ_DB_PATH)}`))
  .then(() => execute(`wget -O ${TZ_DB_PATH} ${MOMENT_TZ_URL}`))
  .then(() => JSON.parse(readFile(TZ_DB_PATH, 'utf8')))
  .then(({ version, zones, links }) => {
    const writeZoneToFile = (data) => {
      const zoneName = data.split('|')[0];
      const name = zoneName.toLowerCase();
      const fileContent = JSON.stringify({ version, name, data: data.replace(zoneName, name) });

      return Promise.resolve()
        .then(() => execute(`mkdir -p src/data/timezones/${dirname(name)}`))
        .then(() => execute(`echo '${fileContent}' > src/data/timezones/${name}.json`));
    };

    return Promise.all([
      ...zones.map(writeZoneToFile),
      ...links.map((link) => {
        const [originalZoneName, linkedZoneName] = link.split('|');
        const zone = zones.find((zone) => zone.startsWith(originalZoneName));
        const data = zone.replace(originalZoneName, linkedZoneName);

        return writeZoneToFile(data);
      }),
    ]);
  })
.catch((error) => console.error(error));

export default updateTzDatabase;
