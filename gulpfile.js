var gulp = require('gulp'),
    compass = require('gulp-for-compass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync');


gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config: './config.rb',
            sassDir: 'sass',
            cssDir: '.'
        }))
        .pipe(autoprefixer({'browsers': ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
        .pipe(gulp.dest('./style.css'))
        .pipe(browsersync.stream());
});

gulp.task('serve', ['sass'], function () {
    browsersync.init({
        server: './'
    });

    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browsersync.reload);
});

gulp.task('default', ['serve']);