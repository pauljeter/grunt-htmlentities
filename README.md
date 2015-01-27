
# grunt-htmlentities

> Grunt task for the javascript HE html entities handler. This task can be used to encode an entire file or multiple files. 

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlentities --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlentities');
```

## The "htmlentities" task

### Overview
In your project's Gruntfile, add a section named `htmlentities` to the data object passed into `grunt.initConfig()`.

```js
  htmlentities: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.rename
Type: `String`
Default value: `''`

A string value that is used to rename the file(s) that you are encoding. If you are encoding multiple files to a single directory, you should not use this option as it will rename and override the previously encoded files, leaving only the last encoded file in the directory. 

TODO: Add option to rename with a variable to allow for renaming to a single directory.

#### options.extname
Type: `String`
Default value: `''`

A string value that is used to to add an extension name to the encoded file before the 'html' extension.

#### options.encodeEverything
Type: `Boolean`
Default value: `false`

This means that grunt-htmlentities will not use any character references for printable ASCII symbols that don’t need escaping. Set it to true to encode every symbol in the input string. When set to true, this option takes precedence over `options.allowUnsafeSymbol`

```js
// Default `false` setting
input:
  'foo © bar ≠ baz 𝌆 qux'
output:
  'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Setting to `true`, to explicitly encode all symbols
input:
  'foo © bar ≠ baz 𝌆 qux'
output:
  '&#x66;&#x6F;&#x6F;&#x20;&#xA9;&#x20;&#x62;&#x61;&#x72;&#x20;&#x2260;&#x20;&#x62;&#x61;&#x7A;&#x20;&#x1D306;&#x20;&#x71;&#x75;&#x78;'
```

#### options.useNamedReferences
Type: `Boolean`
Default value: `true`

This means that grunt-htmlentities will use hexadecimal escapes (e.g. &#xA9;) in the output — named character references (e.g. &copy;) will be used instead when available. Set it to true to enable the use of only hexadecimal escapes.

```js
// Default `true` setting
input:
  'foo © bar ≠ baz 𝌆 qux'
output:
  'foo &copy; bar &ne; baz &#x1D306; qux'

// Setting to `false`, to explicitly disallow named references
input:
  'foo © bar ≠ baz 𝌆 qux'
output:
  'foo &#xA9; bar &#x2260; baz &#x1D306; qux'
```

#### options.allowUnsafeSymbols
Type: `Boolean`
Default value: `false`

This means that characters that are unsafe for use in HTML content (&, <, >, ", ', and `) will be encoded. When set to true, only non-ASCII characters will be encoded. If the encodeEverything option is set to true, this option will be ignored.

```js
input:
  'foo © and & ampersand'
output:
  'foo &#xA9; and & ampersand'
```

#### options.strict
Type: `Boolean`
Default value: `false`

This means that grunt-htmlentities will encode any HTML text content you feed it, even if it contains any symbols that cause parse errors. To throw an error when such invalid HTML is encountered, set the strict option to true. This option makes it possible to use he as part of HTML parsers and HTML validators.

### Usage Examples

#### Default Options
In this example, the default options are used to do 2 files into a single directory. The generated result would be `dest/encoded/testing.html` and `dest/encoded/123.html`.  (Notice that the encoded JavaScript file was converted to an HTML document.)

```js
grunt.initConfig({
  htmlentities: {
    options: {},
    files: {
     src: ['src/testing.html', 'src/123.js'],
     dest: 'dest/encoded/'
  }
  }
});
```

#### Custom Options
In this example, custom options are used to do something encode files to their existing directories. The generated result would be `src/templates/encoded.tpl.html` and `src/js/encoded.tpl.html`.  (Notice that the `dest` property was omitted.)

```js
grunt.initConfig({
  htmlentities: {
    options: {
    rename: encoded,
    extname: tpl
  },
  src: ['src/templates/testing.html', 'src/js/123.js']
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 - 2015-1-22   v0.1.1   Update README.md.
 - 2015-1-20   v0.1.0   Initial release.