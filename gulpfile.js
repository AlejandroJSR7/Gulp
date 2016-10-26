var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function(){
    console.log('Hola Gulp!!!');
});

gulp.task('sass', function(){
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});