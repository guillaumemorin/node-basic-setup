var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

gulp.task('js', function() {
  gulp.src(['js/*.js'])
  .pipe(concat('core.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/'))
})

gulp.task('css', function() {
  gulp.src(['css/*.css'])
  .pipe(concat('core.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('build/'))
})

gulp.task('webserver', function () {
  nodemon({script: 'index.js', ext: 'html js'})
  .on('restart', function () {
    console.log('restarted!')
  })
})

gulp.task('default', ['js', 'css', 'webserver']);
