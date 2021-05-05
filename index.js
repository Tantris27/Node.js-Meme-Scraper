const fetch = require('node-fetch');
let html;

fetch('https://memegen-link-examples-upleveled.netlify.app/').then((res) => {
  html = res.text();
  console.log(html);
});
