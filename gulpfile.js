var gulp = require('gulp');
var rename = require('gulp-rename');
var hb = require('gulp-hb');
var frontMatter = require('gulp-front-matter');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var highlight = require('gulp-highlight');
var browserSync = require('browser-sync').create();

gulp.task('compile-templates', function() {
  return gulp
    .src('./src/pages/**/*.hbs')
    .pipe(frontMatter({
      property: 'data.page'
    }))
    .pipe(hb({
      partials: './src/{partials,layouts}/**/*.hbs',
      data: './src/data/settings.json',
      helpers: './src/helpers/*.js'
    }))
    .pipe(highlight())
    .pipe(rename(function (path) {
      if (path.basename === 'home') {
        path.basename = 'index';
      } else {
        path.basename += '/index';
      }
      path.extname = '.html';
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('scripts', function() {
  return gulp
    .src('./src/js/**/*')
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false,
    open: false,
    ghostMode: false
  });

  // gulp.watch('./dist/*.html').on("change", browserSync.reload);
  // gulp.watch('./dist/**/*.html').on("change", browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('./src/{data,layouts,pages,partials}/**/*', ['compile-templates']);
  gulp.watch('./src/images/*', ['images']);
  gulp.watch('./src/sass/**/*', ['sass']);
  gulp.watch('./src/js/**/*', ['scripts']);
  // gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', [
  'watch',
  'compile-templates',
  'images',
  'sass',
  'scripts',
  'browser-sync'
]);
