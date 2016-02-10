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
    mix.webpack('app.js');
});
```

You can also use multiple entry points.

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-webpack');

elixir(function(mix) {
    mix.webpack(['app.js', 'backend.js']);
});
```

#### Advanced example

```javascript
elixir(function(mix) {
    mix.webpack('app.js', {
        module: {
          loaders: [
            { test: /\.css$/, loader: 'style!css' },
          ],
        },
    });
});
```

Multiple entry points.

```javascript
elixir(function(mix) {
    mix.webpack(['app.js', 'backend.js'], {
        module: {
          loaders: [
            { test: /\.css$/, loader: 'style!css' },
          ],
        },
    });
});
```

Setting an output file.

```javascript
elixir(function(mix) {
    mix.webpack('app.js', {}, './your-public-path/app.js');
});
```
