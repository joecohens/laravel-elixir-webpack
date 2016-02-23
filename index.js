var gulp = require('gulp');
var webpack = require('webpack-stream');
var UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
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

    var options = applyDefaults(options);

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

/**
 * Add sensitive default values to webpack options such as sourcemaps and
 * minification.
 *
 * @param {object} options
 * @return {object}
 */
var applyDefaults = function(options) {
    if (config.sourcemaps) {
        options = _.defaults(
            options,
            { devtool: '#source-map' }
        );
    }

    if (config.production) {
        var currPlugins = _.isArray(options.plugins) ? options.plugins : [];
        options.plugins = currPlugins.concat([new UglifyJsPlugin({ sourceMap: false })]);
    }

    return options;
}
