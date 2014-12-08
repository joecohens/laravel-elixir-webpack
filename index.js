var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
    notify = require('gulp-notify');
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    elixir = require('laravel-elixir'),
     _ = require('underscore'),
    utilities = require('laravel-elixir/ingredients/helpers/utilities');

elixir.extend('webpack', function (src, outputDir, options) {

	var config = this,
        baseDir = config.assetsDir + 'js',
        defaultOptions;

    defaultOptions = {
    };

    src = utilities.buildGulpSrc(src, baseDir, '**/*.js');

    options = _.extend(defaultOptions, options);

	gulp.task('webpack', function () {
		var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "Webpack Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            })(err);

            this.emit('end');
        };

		return gulp.src(src)
			.pipe(webpack(options)).on('error', onError)
			.pipe(gulpif(config.production, uglify()))
        	.pipe(gulp.dest(options.output || config.jsOutput))
        	.pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Webpack Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }));
	});

    this.registerWatcher('webpack', baseDir + '/**/*.js');

    return this.queueTask('webpack');

});