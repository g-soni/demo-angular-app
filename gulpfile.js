var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var del = require('del');


gulp.task('clean', function() {
  return del('dist');
});

gulp.task('minify', ['copy-html'], function() {
  return gulp.src('./dist/index.html')
    .pipe(usemin({
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-html', function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', function() {
  return gulp.src([
      './app/*.woff2',
      './app/*.eot',
      './app/*.svg',
      './app/*.ttf',
      './app/*.woff',
      './app/*.png',
      './app/*.js.map'
    ])
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['minify']);
