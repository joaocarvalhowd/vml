var gulp = require('gulp'),
    sass = require('gulp-sass'),
    nano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src(['src/sass/app.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: true
        }))
        .pipe(nano())
        .pipe(gulp.dest('css/'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

gulp.task('html', function () {
    return gulp.src('src/js/views/**/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('js/views'))
});

gulp.task('watch-build', function () {
    gulp.watch('src/sass/**/**/*.scss', ['sass']);
    gulp.watch('src/js/**/**/*.js', ['js']);
    gulp.watch('src/js/views/**/**/*.html', ['html']);
});

gulp.task('default', ['sass', 'js', 'html']);
gulp.task('watch', ['default', 'watch-build']);