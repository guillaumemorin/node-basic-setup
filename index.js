var jade = require('jade'),
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	conf = require('./conf.js'),
	ws = require('./websocket.js'),
	routes = require('./routes.js');

var app = http.createServer(function (req, res) {

	// Basic try/catch error handling, see http://nodejs.org/api/domain.html for nodejs recommanded one
	try {

		var req_path = url.parse(req.url).pathname;

		if (typeof routes[req_path] === 'string') {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(jade.renderFile(conf.templates.path + routes[req_path]));
			return;
		}

		// Serve static content
		if (path.dirname(req_path) === '/public' && fs.existsSync(__dirname + req_path)) {
			res.writeHead(200, {'Content-Type': conf.mime_type[path.extname(req_path).split('.')[1]]});
			res.end(fs.readFileSync(__dirname + req_path));
			return;
		}

		res.writeHead(404, {"Content-Type": "text/html"});
		res.end(jade.renderFile(conf.templates.path + '404', {error: '404. Nothing here!'}));

	} catch (e) {
		res.writeHead(500, {"Content-Type": "text/plain"});
		res.end('Something went wrong! :(');
	}
}).listen(1337, '127.0.0.1');

ws.init(app);

console.log('Server running at http://127.0.0.1:1337/');