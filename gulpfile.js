var gulp = require('gulp');

//Minify HTML
var html = require('gulp-htmlmin');

gulp.task('html', () => {
    return gulp.src('src/**/*.html').pipe(html()).pipe(gulp.dest('dist'));
});

//PUG - HTML
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp
        .src('./src/*.pug')
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest('./src'));
});

//SASS - CSS
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./src/css/main.scss').pipe(sass()).pipe(gulp.dest('./src/css'));
});
gulp.task('sass:watch', () => {
    gulp.watch('./src/css/main.scss', gulp.series('sass'));
});

//LESS - CSS
var less = require('gulp-less');

gulp.task('less', () => {
    return gulp.src('./src/css/**/*.less').pipe(less()).pipe(gulp.dest('./src/css'));
});
gulp.task('less:watch', () => {
    gulp.watch('./src/css/**/*.less', gulp.series('less'));
});

//Clean CSS
var clean = require('gulp-clean-css');

gulp.task('cleanCSS', () => {
    return gulp.src('./src/css/main.css').pipe(clean()).pipe(gulp.dest('dist/css'));
});

//Minify JS
var minify = require('gulp-minify');

gulp.task('minifyJS', () => {
    return gulp
        .src('./src/js/main.js')
        .pipe(
            minify({
                ext: {
                    min: '.js'
                }
            })
        )
        .pipe(gulp.dest('dist/js'));
});

// Image - Minify
var imageMin = require('gulp-imagemin');

gulp.task('imageMin', () => {
    return gulp.src('./src/images/**/*').pipe(imageMin()).pipe(gulp.dest('dist/images'));
});

//Browser Sync
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', () => {
    var files = ['./src/**/*.html', './src/**/*.pug', './src/css/**/*.scss', './src/css/**/*.less', './src/js/**/*.js'];

    browserSync.init(files, {
        server: {
            baseDir: './src'
        }
    });

    gulp.watch(['./src/**/*.html'], reload);
    gulp.watch(['./src/**/*.pug'], gulp.series('pug'), reload);
    gulp.watch(['./src/css/**/*.scss'], gulp.series('sass'), reload);
    gulp.watch(['./src/css/**/*.less'], gulp.series('less'), reload);
    gulp.watch(['./src/js/**/*.js'], reload);
});

//Gulp-Method
gulp.task('dev', gulp.series('serve'));
gulp.task('build', gulp.series('html', 'cleanCSS', 'minifyJS', 'imageMin'));