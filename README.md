# node-modules-webant-handler-stylus

_Require stylus files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it's required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you'd like to use the module outside of webant, install as follows:

    $ npm install webant-handler-stylus

## Usage

Ensure the `stylus` handler is present in your webant configuration file.

An example configuration file which uses this handler may look like this:

````json
{
    "jsEntryPath":"%%base%%/src/js/main.js",
    "jsDestPath":"%%base%%/build/main.js",
    "handlers":{
        "stylus":{}
    }
}
````

You may now `require` CSS files via the function style or the comment style:

````javascript
//=>require ../path/to/styles.stylus
````

````javascript
require("../path/to/styles.stylus");
````

If a stylus file is included via the function style, the compiled CSS will be inserted into the DOM at runtime.

If on the other hand the stylus file is included via the comment style then the `require`d compiled CSS will be added to the file at `cssDestPath` and will be added to the `{{internalCss}}` variable which can be used within the handlebars template file at `htmlEntryPath`.

Both `cssDestPath` and `htmlEntryPath` are optional settings that may be added to the webant configuration file. E.g:

````json
{
    "jsEntryPath":"%%base%%/src/js/main.js",
    "jsDestPath":"%%base%%/build/main.js",
    "cssDestPath":"%%base%%/build/styles/css",
    "htmlEntryPath":"%%base%%/src/index.hbs",
    "htmlDestPath":"%%base%%/build/index.html",
    "handlers":{
        "stylus":{}
    }
}
````

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Settings

__`compress`__

Can be either `true` or `false` (default). Controls whether the compiled CSS is compressed.

## Tests

    $ npm test