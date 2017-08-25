var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var htmlToJson = require('html-to-json');
var word = '교환학생';
/// / var url = 'http://www.imdb.com/title/tt1229340';
var url = 'http://www.ssu.ac.kr/web/kor/plaza_d_01?p_p_id=EXT_MIRRORBBS&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_EXT_MIRRORBBS_struts_action=%2Fext%2Fmirrorbbs%2Fview&_EXT_MIRRORBBS_sCategory2=%EA%B5%AD%EC%A0%9C%EA%B5%90%EB%A5%98';
//var url = 'http://www.nvoim.com/Mypage/mainStudyRoom.asp';
// request(url, (err, response, html) => {
//     if (err) throw err;
//     var $ = cheerio.load(html);
//
//
//     console.log($('body').text());
// }

var Crawler = require('crawler');
var c = new Crawler({
    maxConnections: 10,

    callback : function(error, res, done){
        if(error) console.log(error);
        else {
            var $ = res.$;
            htmlToJson.parse(res.body, ['.left', function ($item){
                return $item.text();
            }])
                .done(function (items){
                    console.log(items);
                },function(err){
                    console.log(err);
                });

            htmlToJson.parse(res.body,)
        }
    }
});

// c.queue({
//     html : '<td class="left">'
// });

c.queue({
    url : 'http://www.ssu.ac.kr/web/kor/plaza_d_01?p_p_id=EXT_MIRRORBBS&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_EXT_MIRRORBBS_struts_action=%2Fext%2Fmirrorbbs%2Fview&_EXT_MIRRORBBS_sCategory2=%EA%B5%AD%EC%A0%9C%EA%B5%90%EB%A5%98',
    parameter1 : 'left'

});


module.exports = router;