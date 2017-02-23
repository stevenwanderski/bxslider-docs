var gulp = require('gulp');
var rename = require('gulp-rename');
var hb = require('gulp-hb');
var frontMatter = require('gulp-front-matter');
var sass = require('gulp-sass');

gulp.task('compile-templates', function() {
  return gulp
    .src('./src/pages/**/*.hbs')
    .pipe(frontMatter({
      property: 'data.page'
    }))
    .pipe(hb({
      partials: './src/{partials,layouts}/**/*.hbs',
      data: './src/data/settings.json'
    }))
    .pipe(rename({
      suffix: '/index',
      extname: '.html'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  return gulp
    .src('./src/images/*')
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/{data,layouts,pages,partials}/**/*', ['compile-templates']);
  gulp.watch('./src/images/*', ['images']);
  gulp.watch('./src/sass/**/*', ['sass']);
});

gulp.task('default', ['watch', 'compile-templates', 'images', 'sass']);
