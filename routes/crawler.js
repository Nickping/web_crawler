var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var htmlToJson = require('html-to-json');
var nodemailer = require('nodemailer');
var intervalFunction;
var found = false;
var wordCount = 0;
var url;
/// / var url = 'http://www.imdb.com/title/tt1229340';
//var url = 'http://www.ssu.ac.kr/web/kor/plaza_d_01?p_p_id=EXT_MIRRORBBS&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_EXT_MIRRORBBS_struts_action=%2Fext%2Fmirrorbbs%2Fview&_EXT_MIRRORBBS_sCategory2=%EA%B5%AD%EC%A0%9C%EA%B5%90%EB%A5%98';
var Crawler = require('crawler');

function checkvalidation(items, word, from, passwd, to) {

    console.log(items);

    if (items == undefined || items[0] == undefined || items[0].title == undefined || items[0].title == undefined)
        return;
    if (items[0].title.indexOf(word) != -1) {
        console.log('////////////');
        console.log(items[0].title);

        // var smtpTransport = nodemailer.createTransport("SMTP", {
        //     service: 'Gmail',
        //     auth: {
        //         user: from,
        //         pass: passwd
        //     }
        // });
        //
        // var mailOption = {
        //     from: from,
        //     to: to,
        //     subject: 'soongsil mail alram',
        //     text: word + 'found'
        // }
        //
        // smtpTransport.sendMail(mailOption, (err, response) => {
        //     if (err) console.log(err);
        //     else
        //         console.log("Mail send to ", to);
        //     smtpTransport.close();
             //clearInterval(intervalFunction);
        // });

        //found. send email
        console.log('end');
        //return;
    }
    console.log('??');

}


function loop(url, word, from, passwd, to) {

    console.log('loop');
    console.log(url);
    console.log(word);
    console.log(from);
    console.log(passwd);
    console.log(to);
    var c = new Crawler({

        maxConnections: 10,

        callback: function (error, response, done) {
            if (error) console.log(error);
            else {
                var $ = response.$;
                htmlToJson.parse(response.body, ['.left', function ($item) {
                    //console.log(($it  em));
                    var arr = ($item).children();

                    if (typeof arr == undefined)
                        return;
                    if (arr[0] !== undefined && $item[0].attribs.class !== 'left bold') {

                        var json = {url: "", title: ""};
                        json.url = arr[0].attribs.href;
                        json.title = ($item).children().text().split('\t')[1];
                        return json;
                    }

                    return;

                }])
                    .done(function (items) {

                        //console.log(items);
                        var arr = new Array();
                        for (i = 0; i < items.length; i++) {
                            if (items[i] !== undefined)
                                arr.push(items[i]);
                        }
                        checkvalidation(arr, word, from, passwd, to);
                    }, function (err) {
                        console.log(err);
                    });
            }
        }
    });

    c.queue([
        url
    ]);
    console.log('loop end');
    // return;
}


function doLoop(url, word, from, passwd, to) {

    // setInterval(function(){
    //     console.log('hi');
    // }, 2000);

    //loop(url, word, from, passwd, to);

     intervalFunction= setInterval(function () {
        loop(url, word, from, passwd, to)
    }, 7000);


}

router.post('/setAlram', (req, res) => {

    url = req.body.url;
    var word = req.body.word;
    var from = req.body.from;
    var passwd = req.body.passwd;
    var to = req.body.to;
    console.log(url);
    res.status(200);

    doLoop(url, word, from, passwd, to);
    // while (!found)
    //     setTimeout(loop(),5000);
    //

});

module.exports = router;