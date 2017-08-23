var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin')
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'css', 'javascript'], function() {

    browserSync.init({
        startPath : "./app" ,
        server:{
            baseDir: './'
        }
    });

    gulp.watch("app/js/*.js", ['javascript']).on('change', browserSync.reload);
    gulp.watch("scss/**/*.scss", ['css']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('./*.html', ['html']);
});

gulp.task('html', function(){
    return gulp.src('./*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('app'));
});

gulp.task('images', function() {
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img/'));
    }
);

gulp.task('javascript', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js/dist'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('css', function() {
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

gulp.task('default', ['serve']);
