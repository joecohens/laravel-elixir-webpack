var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var _ = require('underscore');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('webpack', function (src, options, output) {
    var paths = prepGulpPaths(src, output);

    if (_.isObject(src) && !_.isArray(src)) {
        options = src;
    } else {
        options = _.extend({
            output: {
                filename: paths.output.name,
            },
        }, options);
    }

    new Elixir.Task('webpack', function () {
        this.log(paths.src, paths.output);

        return (
            gulp.src(paths.src.path)
                .pipe($.if(!_.isArray(paths.src.path), named()))
                .pipe(webpack(options))
                .on('error', function(e) {
                    new Elixir.Notification('Webpack Compilation Failed!');

                    this.emit('end');
                })
                .pipe($.if(! config.production, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Webpack Compiled!'))
        );
    })
    .watch(config.assetsPath + '/**/*');
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param {string|array} src
 * @param {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'app.js');
};
