var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('webserver', function () {
	nodemon({script: 'index.js', ext: 'html js'})
	.on('restart', function () {
		console.log('restarted!')
	})
})

gulp.task('default', ['webserver']);
