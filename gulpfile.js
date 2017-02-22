var gulp = require('gulp');
var rename = require('gulp-rename');
var hb = require('gulp-hb');
var frontMatter = require('gulp-front-matter');

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
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', function() {
  gulp.watch('./src/{data,layouts,pages,partials}/**/*', ['compile-templates']);
  gulp.watch('./src/images/*', ['images']);
});

gulp.task('default', ['watch', 'compile-templates', 'images']);
