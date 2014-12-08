var gulp = require('gulp'),
    notify = require('gulp-notify');
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/helpers/utilities');

elixir.extend('webpack', function (src, outputDir, options) {

    this.registerWatcher('webpack', baseDir + '/**/*.js');

    return this.queueTask('webpack');

});