var io = require('socket.io');

var socket = function() {}

socket.prototype.init = function(app) {
	io = io.listen(app);

	io.on('connection', function (socket) {

		console.log('client connected', socket.id);

		socket.on('disconnect', function () {
			console.log('client disconnected');
		});
	});
}

module.exports = new socket();