var gulp = require('gulp'),
    webpack = require('webpack-stream'),
    gulpIgnore = require('gulp-ignore'),
    _ = require('underscore'),
    Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('webpack', function (src, options) {
    options = _.extend({
        debug:     ! config.production,
        srcDir:    config.get('assets.js.folder'),
        outputDir: config.get('public.js.outputFolder'),
        output: {
          filename: src
        }
    }, options);

    new Elixir.Task('webpack', function () {
        var paths = prepGulpPaths(src, options.srcDir, options.outputDir);

        this.log(paths.src, paths.output);

        return (
            gulp.src(paths.src.path)
                .pipe(webpack(options))
                .on('error', function(e) {
                    new Elixir.Notification('Webpack Compilation Failed!');

                    this.emit('end');
                })
                .pipe(gulpIgnore.include('*.js'))
                .pipe($.if(! options.debug, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Webpack Compiled!'))
        );
    })
    .watch(options.srcDir + '/**/*');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param {string|array} src
 * @param {string|null}  baseDir
 * @param {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output, 'app.js');
};
