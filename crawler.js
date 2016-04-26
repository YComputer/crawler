var http = require('http')
var url = 'http://www.imooc.com/learn/348'
var cheerio = require('cheerio')

function filterChapter(html) {
    var $ = cheerio.load(html)
    var chapters = $('.chapter')
        // [{
        // 	chapterTitle: '',
        // 	videos:[{
        // 		title: '',
        // 		id: ''
        // 	}]
        // }]

    var courseData = []
    chapters.each(function(item) {
        var chapter = $(this)
        var chapterTitle = chapter.find('strong').text()
        var videos = chapter.find('.video').children('li')
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function(item) {
            var video = $(this).find('.J-media-item')
            console.log('---------',video)
            var videoTitle = video.text()
            var id = video.attr('href').split('video/')[1]

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })

        courseData.push(chapterData)

    })

    return courseData

}

function printCourseInfo(courseData) {
    courseData.forEach(function(item) {
        var chapterTitle = item.chapterTitle
        console.log(chapterTitle + '\n')
        item.videos.forEach(function(item) {
            console.log('[' + item.id + ']' + item.tilte + '\n')
        })
    })
}

http.get(url, function(res) {
    var html = '';

    res.on('data', function(data) {
        html += data
    })

    res.on('end', function() {
        var courseData = filterChapter(html)
        printCourseInfo(courseData)
    })
}).on('error', function() {
    console.log('获取课程数据出错！')
})
