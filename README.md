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