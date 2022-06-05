const cheerio = require('cheerio');
function handler(resp) {
    const listFilms = [];
    const html = resp.data;
    const $ = cheerio.load(html);
    $('article', html).each(function () {
        const name = $(this).find('div > a').attr('title');
        const link = $(this).find('div > a').attr('href');
        const image = $(this).find('div > a > figure > img').attr('src');
        listFilms.push({
            name,
            link,
            image,
        });
    });
    return listFilms;
}

module.exports = handler;
