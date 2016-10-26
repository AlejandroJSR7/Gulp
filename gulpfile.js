var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/js/*.js", ['compress']);
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('compress', function (cb) {
    pump([
        gulp.src('app/js/*.js'),
        uglify(),
        gulp.dest('app/js/dist')
    ],
    cb
  );
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch('scss/**/*.scss', [sass]);
});