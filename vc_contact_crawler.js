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

var http = require('http')
var cheerio = require('cheerio')
var fs = require('fs')
var page = 1

var url = 'http://startupboard.sudoboot.com/contacts?page=' + page
console.log(url)
http.get(url, function(res) {
    console.log(url + '----------')
    var html = ''

    res.on('data', function(data) {
        html += data
    })

    res.on('end', function() {
        filterContacts(html)
    })
}).on('error', function(error) {
    console.log('获取数据出错')
    console.log(error)
})

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

        fs.appendFile('contacts.txt', JSON.stringify(singleContact) + '\n')
            // console.log(singleContact)
    })
}
