# node-modules-webant-handler-stylus

_Require stylus files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

    $ npm install webant-handler-stylus

## Usage

Ensure the `stylus` handler is present in your webant configuration file. For example:

````json
{
    "entry":"src/js/main.js",
    "dest":"build/main.js",
    "handlers":["stylus"]
}
````

You may now `require` stylus files:

````javascript
require("../path/to/styles.stylus");
````

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Settings

__`compress`__

Can be either `true` or `false` (default). Controls whether the compiled CSS is compressed.

## Tests [![Build Status](https://travis-ci.org/theakman2/node-modules-webant-handler-stylus.png?branch=master)](https://travis-ci.org/theakman2/node-modules-webant-handler-stylus)

Ensure [phantomjs](http://phantomjs.org) is installed and in your PATH, then run:

    $ npm test