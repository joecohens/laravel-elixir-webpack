# laravel-elixir-webpack

Simple extension to *laravel elixir* to build javascript bundle with *webpack*.

## Install

```
npm install --save-dev laravel-elixir-webpack
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require("laravel-elixir");

require("laravel-elixir-webpack");

elixir(function(mix) {
    mix.webpack("app.js");
});

```
First argument is the entry point of your application _(default directory is resources/assets/js)_. In third argument you could pass webpack options. In production bundle will be compressed.

#### Advanced example

```javascript
elixir(function(mix) {
    mix.webpack("app.js", {
        outputDir: "public/js",
        entry: {
            app: "src/app.js",
            test: "test/test.js",
        },
        output: {
            filename: "bundle.js"
        }
    });
});
```
