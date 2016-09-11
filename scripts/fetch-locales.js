import fetch from 'node-fetch';
import { writeFileSync, readdirSync } from 'fs';

const headers = {
  Authorisation: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3.raw',
};

const getFileNameFromUrl = (url) => {
  const splitUrl = url.split('/');
  return splitUrl[splitUrl.length - 1];
};

fetch('https://api.github.com/repos/moment/moment/contents/src/locale', headers)
  .then((contents) => contents.json())
  .then((json) => json.map((file) => file.download_url))
  .then((downloadList) => Promise.all(downloadList.map((url) => fetch(url, headers))))
  .then((resolvedPromises) => Promise.all(resolvedPromises.map((downloadedFile) => {
    return downloadedFile.text()
      .then((content) => ({ url: downloadedFile.url, content }))
  })))
  .then((fileList) => {
    return fileList.map(({ url, content }) => {
      const filePath = `./.moment-data/${getFileNameFromUrl(url) }`;
      const fileLines = content.split('\n')

      const weekdaysLong = fileLines.find('weekdays');
      const weekdaysShort = fileLines.find('weekdaysShort');

      console.log()



    });
  })
  .catch((error) => console.log(error));
