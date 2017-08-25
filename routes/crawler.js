var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');

var word = '교환학생';
var url = 'http://www.ssu.ac.kr/web/kor/plaza_d_01?p_p_id=EXT_MIRRORBBS&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_EXT_MIRRORBBS_struts_action=%2Fext%2Fmirrorbbs%2Fview&_EXT_MIRRORBBS_sCategory2=%EA%B5%AD%EC%A0%9C%EA%B5%90%EB%A5%98';

request(url, (err, response, html) => {
    if (err) throw err;

    var $ = cheerio.load(html);
    var bodytext = $('html > body').text();
    console.log(bodytext);
    if(bodytext.toLowerCase().indexOf(word.toLowerCase())!==-1){
        console.log('found');
    }else{
        console.log('not found');
    }
    console.log('page title : '+ $('title').text());
    // console.log($('title'.text()));
    //console.log(html);
});


module.exports = router;