var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jasmineBrowser = require('gulp-jasmine-browser');
var watch = require('gulp-watch');

gulp.task('jasmine', function() {
    var filesForTest = ['src/**/*.js', 'test/**/*_spec.js'];
    return gulp.src(filesForTest)
        .pipe(watch(filesForTest))
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({port : 8888}));
});

gulp.task('mocha', function() {
    return gulp.src('test/**/*_mocha.js', {read : false})
        .pipe(mocha({reporter : 'nyan'}))
        .once('error', function() {
            process.exit(1);
        })
        .once('end', function() {
            process.exit();
        });
});
