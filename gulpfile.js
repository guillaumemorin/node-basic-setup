var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');

gulp.task('minify', function() {
  gulp.src('public/*.js')
  .pipe(uglify())	
  .pipe(gulp.dest('build/'));
})

gulp.task('webserver', function () {
  nodemon({script: 'index.js', ext: 'html js'})
  .on('restart', function () {
    console.log('restarted!')
  })
})

gulp.task('default', ['minify', 'webserver']);
