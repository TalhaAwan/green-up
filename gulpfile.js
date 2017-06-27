var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');
    mocha = require('gulp-mocha')

gulp.task('default', [
    'watch',
    // 'build-src-css',
    'build-css',
    // 'build-src-js',
    'build-js',
    // 'jshint'
]);



gulp.task('test', function () {
    return gulp.src(['server/**/*.spec.js'])
        .pipe(mocha({ reporter: 'spec' }))

});



gulp.task('build-src-css', function() {
    return gulp.src('client/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('src.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())

        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('build-css', function() {
    return gulp.src([
        // "public/libs/bootstrap/dist/css/bootstrap.min.css",
        "public/template/css/modern-business.css",
        "public/styles/style.css",
        // "public/libs/font-awesome/css/font-awesome.css"
    ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/dist'));
});


gulp.task('build-src-js', function() {
    return gulp.src('client/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('src.min.js'))
        // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/javascript'));
});


gulp.task('build-js', function() {
    return gulp.src([
        // "public/libs/jquery/dist/jquery.min.js",
        // "public/libs/bootstrap/dist/js/bootstrap.min.js",
        "public/libs/levenshtein/lib/levenshtein.js",
        "views/**/*.js"
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});


gulp.task('jshint', function() {
    return gulp.src('client/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function() {
    gulp.watch('views/**/*.js', [ 'build-js']);
    gulp.watch('public/styles/**/*.css', ['build-css']);
});