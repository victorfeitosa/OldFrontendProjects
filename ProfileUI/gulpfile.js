var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-csso');

gulp.task('default', ['sass']);

gulp.task('sass', function() {
    return gulp.src('components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minify())
    .pipe(gulp.dest('public/dist/css'))
});

gulp.task('sass-watch', ['sass'], function() {
    gulp.watch('components/**/*.scss', ['sass']);
}); 