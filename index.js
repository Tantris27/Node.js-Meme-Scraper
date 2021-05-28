const fetch = require('node-fetch');
const fs = require('node:fs');
const cheerio = require('cheerio');

const siteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Makes a new Folder if it does not exist already
fs.mkdirSync('./Meme', { recursive: true });
console.log("Finding or creating 'Meme' folder...");

// defining the function and saving it to getMemes
const getMemes = async () => {
  // these next 2 lines get all the html and turn it into plain text(a string)
  const response = await fetch(siteUrl);
  const body = await response.text();
  // these next 2 lines create nodes from the String and create an empty Array
  const $ = cheerio.load(body);
  const linkList = [];
  // these next lines split the nodes at the img tags and push the first then src in the Array
  $('img').each((i, link) => {
    if (i < 10) {
      linkList.push(link.attribs.src);
    }
  });
  // for loop which downloads pics through urls and puts the pictures in the Meme folder
  for (let j = 0; j < 10; j++) {
    const url = linkList[j];

    async function download() {
      const response2 = await fetch(url);
      const buffer = await response2.buffer();
      fs.writeFile(`./Meme/image${j}.jpg`, buffer, () =>
        console.log('finished downloading!'),
      );
    }
    download(linkList[j]);
  }
};

getMemes();
