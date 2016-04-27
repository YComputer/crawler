var http = require('http')
var fs = require('fs')

http.createServer(function(req, res){
	// fs.readFile('./Avatar.jpg', function(err, data){
	// 	if(err){
	// 		res.end(err.toString+'file not exist')
	// 	}else{
	// 		res.writeHeader(200,{'Context-Type':'text/html'})
	// 		res.end(data)
	// 	}
	// })
	fs.createReadStream('./Avatar.jpg').pipe(res)

}).listen(8090)