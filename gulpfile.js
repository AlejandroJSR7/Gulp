var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin')
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/js/*.js", ['compress']);
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('./*.html', ['minificar']);
});

gulp.task('minificar', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('app/'));
});

gulp.task('imagemin', () =>
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img/'))
);

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
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});