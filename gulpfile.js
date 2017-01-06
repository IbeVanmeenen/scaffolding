'use strict';

/* ==========================================================================
   Gulpfile

   Development-tasks:
   - gulp (=== build + watch)
   - gulp build
   - gulp watch
   ========================================================================== */


/* Require
   ========================================================================== */
// Require Gulp
var gulp = require('gulp');

// Load Gulp plugins
var plugins = require('gulp-load-plugins')();

// Load sequence
var runSequence = require('run-sequence');

// Del
var del = require('del');

// Chalk for the errorlogger
var chalk = require('chalk');

// Load the notifier.
var notifier = require('node-notifier');



/* Errorhandling (Credits @JensGyselinck)
   ========================================================================== */
var errorLogger = function(headerMessage, errorMessage, write) {
    var i = 0,
        boxLines = '';

    for (; i < headerMessage.length + 4; i ++) {
        boxLines += '=';
    }

    if (write) {
        plugins.util.log('\n' + chalk.red(boxLines + '\n# ') + headerMessage + chalk.red(' #\n' + boxLines) + '\n ' + chalk.blue(errorMessage) + '\n');
    }

    notifier.notify({
        'title': headerMessage,
        'message': errorMessage,
        'icon':  __dirname + '/gulp_error.jpg',
        'sound': true
    });
};



/* Tasks
   ========================================================================== */
// Styles
gulp.task('styles', function() {
    return gulp.src('scaffolding.scss')
        // Sass
        .pipe(plugins.sass())

        // Error catch
        .on('error', function(err) {
            errorLogger('Styles Error', err.message, true);
            this.emit('end');
        })

        // Combine Media Queries
        .pipe(plugins.combineMq())

        // Minify output
        .pipe(plugins.cssnano())

        // Rename the file to respect naming covention.
        .pipe(plugins.rename(function(path) {
            path.basename += '.min';
        }))

        // Write to output
        .pipe(gulp.dest('test/'))
        .pipe(gulp.dest('scaffolding/css/'))

        // Show total size of css
        .pipe(plugins.size({
            title: 'css'
        }))

        .pipe(plugins.livereload());
});


// Clean
gulp.task('clean', function(done) {
    return del(['test/scaffolding.min.css', 'scaffolding/css/scaffolding.min.css'], {
        force: true
    });
});


// Watch
gulp.task('watch', function() {
    // Reload
    plugins.livereload.listen();
    gulp.watch(['test/scaffolding.min.css', 'test/index.html']).on('change', function(file) {
        plugins.livereload.changed(file.path);
    });

    // Watch
    gulp.watch(['scaffolding.scss', 'scaffolding/scss/**/*.scss'], ['styles']);
});


// Connect
gulp.task('connect', function() {
    plugins.connect.server({
        root: __dirname,
        livereload: true
    });
});


// Default
gulp.task('default', function(done) {
    runSequence('clean', 'styles', 'connect', 'watch', done);
});


// Build
gulp.task('build', function(done) {
    runSequence('clean', 'styles', done);
});


// Typo fallbacks
gulp.task('biuld', function(done) {
    gulp.start('build');
});
gulp.task('buil', function(done) {
    gulp.start('build');
});
gulp.task('biuld', function(done) {
    gulp.start('build');
});
gulp.task('buil', function(done) {
    gulp.start('build');
});
gulp.task('buld', function(done) {
    gulp.start('build');
});
