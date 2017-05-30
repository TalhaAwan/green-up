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
    'build-src-css',
    'build-vendor-css',
    'build-src-js',
    'build-vendor-js',
    'jshint'
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

gulp.task('build-vendor-css', function() {
    return gulp.src([
        'client/libs/bootstrap/dist/css/bootstrap.min.css',
        'client/libs/angular-material/angular-material.min.css',
    ])
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/stylesheets'));
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


gulp.task('build-vendor-js', function() {
    return gulp.src([
        "client/libs/jquery/dist/jquery.min.js",
        "client/libs/angular/angular.min.js",
        "client/libs/angular-route/angular-route.min.js",
        "client/libs/angular-animate/angular-animate.min.js",
        "client/libs/angular-aria/angular-aria.min.js",
        "client/libs/angular-material/angular-material.min.js"
    ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/javascript'));
});


gulp.task('jshint', function() {
    return gulp.src('client/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch', function() {
    gulp.watch('client/app/**/*.js', ['jshint', 'build-src-js']);
    gulp.watch('client/scss/**/*.scss', ['build-src-css']);
});