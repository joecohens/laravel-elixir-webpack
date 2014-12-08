# laravel-elixir-webpack

Simple extension to *laravel elixir* to build javascript bundle with *webpack*.

## Install

```
npm install --save-dev laravel-elixir-webpack
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-webpack');

elixir(function(mix) {
    mix.webpack("bootstrap.js");
});

```
First argument is the entry point of your application _(default directory is resources/assets/js)_. Second argument is destination directory. In third argument you could pass webpack options. Two latest parameters are optional. In production bundle will be compressed.

#### Advanced example

```javascript
elixir(function(mix) {
    mix.webpack("bootstrap.js", "public/js", {
    	output: {
            filename: "bundle.js"
        }
    });
});
```
