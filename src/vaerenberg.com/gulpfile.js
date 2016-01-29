/// <binding BeforeBuild='build' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gulpFilter = require('gulp-filter'),
    mainBowerFiles = require('gulp-main-bower-files');

var paths = {
    webroot: "./wwwroot/"
};

paths.lib = paths.webroot + "lib";
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:lib", function (cb) {
    rimraf(paths.lib, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:lib"]);


gulp.task("min:js", ["clean:js"], function (cb) {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", ["clean:css"], function (cb) {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);


gulp.task('lib', ["clean:lib"], function (cb) {
    return gulp.src('./bower.json')
         .pipe(mainBowerFiles({
             overrides: {
                 'bootstrap': {
                     main: []
                 },
                 'bootswatch-dist': {
                     main: [
                         './css/bootstrap.css',
                         './js/bootstrap.js',
                         './fonts/*.*'
                     ]
                 },
                 'font-awesome': {
                     main: [
                         './css/font-awesome.css',
                         './fonts/*.*'
                     ]
                 },
                 'academicons': {
                     main: [
                         './css/academicons.css',
                         './fonts/*.*'
                     ]
                 }
             }
         }))
        .pipe(gulp.dest(paths.lib));
});

gulp.task("build", ["lib", "min"]);

