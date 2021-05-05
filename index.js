const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');

const getReddit = async () => {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text();

  const $ = cheerio.load(body);
  const titleList = [];

  $('img').each((i, title) => {
    if (i < 10) {
      titleList.push(title.attribs.src);
    }
  });
  for (let j = 0; j < 10; j++) {
    const url = titleList[j];
    async function download() {
      const response2 = await fetch(url);
      const buffer = await response2.buffer();
      fs.writeFile(`./Meme/image${j}.jpg`, buffer, () =>
        console.log('finished downloading!'),
      );
    }
    download(titleList[j]);
  }
};

getReddit();
