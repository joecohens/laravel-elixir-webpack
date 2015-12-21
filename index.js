var gulp = require('gulp'),
    webpack = require('webpack'),
    gulpIgnore = require('gulp-ignore'),
    _ = require('underscore'),
    Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('webpack', function (src, options) {
    options = _.extend({
        debug:     !config.production,
        minimize:  !config.production,
        entry: src,
        output: { 
            path: config.publicPath + '/' + config.js.outputFolder,
            filename: '[name].js',
            chunkFilename: "[name].chunk.js",
        },
    }, options);

    var watcher;

    new Elixir.Task('webpack', function () {
        if(watcher) return;

        watcher = webpack(options).watch({ // watch options:
            aggregateTimeout: 300, // wait so long for more changes
            poll: true // use polling instead of native watchers
            // pass a number to set the polling interval
        }, function(err, stats) {
            if(err)
            {
                new Elixir.Notification('Webpack Compilation Failed!');
                console.error(err);
            }
            else
            {
                var jsonStats = stats.toJson();
                if(jsonStats.errors.length > 0)
                {
                    new Elixir.Notification().error(jsonStats.errors, 'Webpack Compilation Failed!');
                }
                else if(jsonStats.warnings.length > 0)
                {
                    console.warn(jsonStats.warnings);
                }

                console.log(stats.toString({colors:true,chunks:false}));
                new Elixir.Notification('Webpack Complete!');
            }
        });
    }).watch(config.assetsPath + '/' + config.js.folder + '/**/*');
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
