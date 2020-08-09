const Crawler = require('simplecrawler');
const cheerio = require('cheerio');
const crawler = new Crawler('https://citizentv.co.ke/');

crawler.initialURL = 'https://citizentv.co.ke/';
crawler.maxDepth = 2;
crawler.ignoreWWWDomain = true;
crawler.scanSubdomains = false;
crawler.parseHTMLComments = false;
crawler.ignoreInvalidSSL = true;
crawler.userAgent =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

crawler.host = 'https://citizentv.co.ke';
crawler.filterByDomain = true;

crawler.on('fetchcomplete', function (queueItem, responseBuffer, response) {
  const $ = cheerio.load(responseBuffer.toString('utf8'), {
    xml: {
      normalizeWhitespace: true,
    },
  });
  const title = $('h1.articleh1').text().trim();
  const author = $('.main-post-author').text().trim();
  const datePublished = $('.date-tag').text();

  const body = $('.parallax-container p').text();
  if (!author) {
    return;
  }
  if (!body) {
    return;
  }
  if (!title) {
    return;
  }
  console.log({
    title,
    author,
    datePublished,
    body,
  });
});

crawler.start();

// crawler.queue.freeze('firstcrawl.json', () => {
//   console.log('crawler terminated!!!');
// });

// crawler.queue.defrost('firstcrawl.json', () => {
//   console.log('Resumming the crawl......');
// });
