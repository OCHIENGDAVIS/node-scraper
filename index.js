const Crawler = require('crawler');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const extractLinks = async (url) => {
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body, { xml: { normalizeWhitespace: true } });
  const links = [];
  $('a').each((i, link) => {
    const href = link.attribs.href;
    links.push(href);
    return links;
  });
};
extractLinks('https://citizentv.co.ke/');

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log($('title').text());
    }
    done();
  },
});

// Queue a list of URLs
c.queue({
  uri: 'https://citizentv.co.ke/',
  skipDuplicates: true,
  referer: true,
  rotateUA: true,
});
