var gulp = require('gulp');
var flatten = require('gulp-flatten');
var babel = require('gulp-babel');


gulp.task('build', async function () {
    gulp.src('./src/**/*.js')
        .pipe(flatten())
        .pipe(babel())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', async function () {
    gulp.watch('./src/**/*.js', ['build']);
});

// gulp.task('default', ['build', 'watch']);