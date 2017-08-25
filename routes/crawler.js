var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var htmlToJson = require('html-to-json');
var first = true;
var wordCount = 0;
var word = '교내근로';
/// / var url = 'http://www.imdb.com/title/tt1229340';
//var url = 'http://www.ssu.ac.kr/web/kor/plaza_d_01?p_p_id=EXT_MIRRORBBS&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_EXT_MIRRORBBS_struts_action=%2Fext%2Fmirrorbbs%2Fview&_EXT_MIRRORBBS_sCategory2=%EA%B5%AD%EC%A0%9C%EA%B5%90%EB%A5%98';
var Crawler = require('crawler');

function checkvalidation(items, word, res) {

    for (i = 0; i < items.length; i++) {
        //console.log(items[i].title);

        if (items[i].title.indexOf(word) != -1) {


            console.log('////////////');
            console.log(items[i].title);
            res.status(200).send(items[i]);
            break;
        }
    }

    if (i == items.length) {
    }


}



router.get('/setAlram', (req, res) => {

    var url = req.headers.url;
    var c = new Crawler({
        maxConnections: 10,

        callback: function (error, response, done) {
            if (error) console.log(error);
            else {
                var $ = response.$;
                htmlToJson.parse(response.body, ['.left', function ($item) {
                    //console.log(($item));
                    var json = {url: "", title: ""};
                    var arr = ($item).children();

                    if (typeof arr == undefined)
                        return;
                    if (arr[0] !== undefined) {
                        //console.log(arr[0].attribs.href);
                        json.url = arr[0].attribs.href;
                        json.title = ($item).children().text().split('\t')[1];
                    }

                    return json;
                }])
                    .done(function (items) {

                        console.log(items);
                        checkvalidation(items, word, res);
                    }, function (err) {
                        console.log(err);
                    });
            }
        }
    });

    c.queue({
        url,
    });
});


module.exports = router;