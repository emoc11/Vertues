//Project related.
var source = './',
    dest   = './',
    site   = 'localhost/Vertues/teaser/';

var gulp = require('gulp');

//gulp css libraries
var globbing     = require("gulp-css-globbing");
var sass         = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');

//gulp js libraries
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');

//npm libraries
var del 		     = require('del');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;

// Tâche css
gulp.task('style', function() {

	del([dest+'style.css']);

  return gulp.src(source + 'scss/main.css')
      .pipe(plumber())
      .pipe(globbing({ extensions: ['.scss'] }))
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: [source+'scss/**/*']
      }))
      .pipe(autoprefixer({
          browsers: ['> 1%', 'last 2 versions']
      }))
      .pipe(cssnano({zindex: false}))
      .pipe(concat('style.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(reload({stream: true}));
});

// gulp.task("source", function() {
//
//   gulp.src(dest+"/*.php")
//     .pipe(reload({stream: true}));
//
// });

gulp.task("watch", function() {

  gulp.start('style');
  gulp.watch(source + '/scss/**/*', ['style']);

});

gulp.task("serve", function() {
  browserSync({proxy: site});
  gulp.start('watch');
});

gulp.task('default', ['style', 'serve'], function() {
});
