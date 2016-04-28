/*
数据来自于
http://startupboard.sudoboot.com/contacts
联系人数据格式
{
    name:'陈新',
    company:'红杉资本',
    position:'早中期TMT',
    email:'cchen@sequoiacap.com'
}
*/

var cheerio = require('cheerio')
var request = require('request');
var async = require('async')
var fs = require('fs')
var baseUrl = 'http://startupboard.sudoboot.com/contacts?page='
var pageNumber = 1

function getData(n) {
    request(baseUrl + n, function(error, response, body) {
        console.log(baseUrl + n)
        if (!error && response.statusCode == 200) {
            filterContacts(body) // Show the HTML for the Google homepage. 
        }
    })
}

// for(var i=1;i<11;i++){
//     getData(i)
// }

var n = 0

var get = setInterval(function() {
    n++
    if(n==75){
        clearInterval(get)
    } 
    getData(n)
}, 1500)


// // generate 5 users
// async.times(50, function(n, next){
//     getData(n+1)

// }, function(err, users) {
//   // we should now have 5 users
// });


function filterContacts(html) {
    var contacts = []
    var $ = cheerio.load(html)
    var contacts = $('tbody').children()
    contacts.each(function(item) {
        // 这里为什么console.log($(item).find('td').length) 的值是0，为什么？？
        // console.log($(this).find('td').length)的值为4，这是想要的结果。
        var details = $(this).find('td')
        var singleContact = {}
        details.each(function(item) {
            //console.log('---',$(this).attr('class'))
            //console.log('---',$(this).text().trim())
            var type = $(this).attr('class').toString().trim()
            var value = $(this).text().toString().trim()
            if (type == 'name') {
                singleContact.name = value
            } else if (type == 'company') {
                singleContact.company = value
            } else if (type == 'position') {
                singleContact.position = value
            } else if (type == 'email') {
                singleContact.email = value
            } else {
                console.log('data parse error')
            }
        })

        fs.appendFile('contactsnew.txt', JSON.stringify(singleContact) + '\n')
            // console.log(singleContact)
    })
}
