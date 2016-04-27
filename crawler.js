var http = require('http')
var cheerio = require('cheerio')
var Promise = require('Promise')
var url = 'http://www.imooc.com/learn/348'
var baseUrl = 'http://www.imooc.com/learn/'

function filterChapter(html) {
    var $ = cheerio.load(html)
    var chapters = $('.chapter')
    var title = $('')

      // courseData = {
      // 	title: title,
      // 	number: number,
      //   videos: [{
      //   	chapterTitle: '',
      //   	videos:[{
      //   		title: '',
      //   		id: ''
      //   	}]
      //   }]
      // }

    var courseData = {
    	title: title,
    	number:number,
    	videos:[]
    }
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
                //console.log('---------',video)
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

function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        conosle.log('正在爬取 ' + url)
        http.get(url, function(res) {
            var html = '';

            res.on('data', function(data) {
                html += data
            })

            res.on('end', function() {
                resolve(html)
                    //var courseData = filterChapter(html)
                    //printCourseInfo(courseData)
            })
        }).on('error', function(e) {
            console.log('获取课程数据出错！')
            reject(e)
        })
    })
}

var fetchCourseArray = []
videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise.all(fetchCourseArray)
	   .then(function(pages){
	   		var coursesData = []
	   		pages.forEach(function(html){
	   			var courses = filterChapter(html)
	   			coursesData.push(courses)
	   		})
	   })










