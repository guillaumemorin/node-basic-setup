var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

/*
 *  Need to install gulp-browserify, react, reactify first!
 */
// var browserify = require('gulp-browserify');
// var reactify = require('reactify');

gulp.task('react', function() {
  gulp.src('js/react/*.js')
  .pipe(browserify({
    transform: [reactify]
  }))
  .pipe(uglify())
  .pipe(concat('react.js'))
  .pipe(gulp.dest('build'))
})

gulp.task('js', function() {
  gulp.src(['js/*.js'])
  .pipe(uglify())
  .pipe(concat('core.js'))
  .pipe(gulp.dest('build/'))
})

gulp.task('css', function() {
  gulp.src(['css/*.css'])
  .pipe(minifyCss())
  .pipe(concat('core.css'))
  .pipe(gulp.dest('build/'))
})

gulp.task('webserver', function () {
  nodemon({script: 'index.js', ext: 'html js'})
  .on('restart', function () {
    console.log('restarted!')
  })
})

gulp.task('default', ['js', 'css', 'webserver']);
