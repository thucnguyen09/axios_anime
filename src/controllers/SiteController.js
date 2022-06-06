const axios = require('axios');
const cheerio = require('cheerio');
const handler = require('../util/handler');
class SiteController {
    home(req, res) {
        const url = 'https://hhhkungfu.tv/latest-movie';
        const listAllFilms = [];
        let listFilmsCurrentPage = [];
        let totalPages = 0;
        const listAxios = [];
        const limit = Number(req.query.limit);
        try {
            axios(url).then((response) => {
                const html = response.data;
                const $ = cheerio.load(html);
                listFilmsCurrentPage = handler(response);
                listAllFilms.push(...listFilmsCurrentPage);
                $('.text-center ul li a', html).each(function () {
                    if ($(this).text() !== '') {
                        totalPages = Number($(this).text());
                    }
                });
                for (let i = 2; i <= totalPages; i++) {
                    listAxios.push(
                        axios('https://hhhkungfu.tv/latest-movie/page/' + i),
                    );
                }
                Promise.all(listAxios).then((resp) => {
                    for (let i = 0; i < resp.length; i++) {
                        listFilmsCurrentPage = handler(resp[i]);
                        listAllFilms.push(...listFilmsCurrentPage);
                    }
                    if(limit && limit < listAllFilms.length) {
                        res.status(200).json({
                            length: limit,
                            data: listAllFilms.slice(0, limit),
                        });
                        return;    
                    } 
                    res.status(200).json({
                        length: listAllFilms.length,
                        data: listAllFilms,
                    });
                });
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new SiteController();
