# gerber parser

> Streaming Gerber/drill file parser

A printed circuit board Gerber and drill file parser. Implemented as a Node transform stream that takes a Gerber text stream and emits objects to be consumed by some sort of PCB plotter.

Part of the [tracespace][] collection of PCB visualization tools.

## install

```shell
npm install --save gerber-parser
# or
yarn add gerber-parser
```

Or, use a script tag:

```html
<script src="https://unpkg.com/gerber-parser@^4.0.0/dist/gerber-parser.min.js"></script>
<script>
  // global variable gerberParser now available
  var parser = gerberParser()
</script>
```

## example

```js
var fs = require('fs')
var gerberParser = require('gerber-parser')

var parser = gerberParser()

parser.on('warning', function(w) {
  console.warn('warning at line ' + w.line + ': ' + w.message)
})

fs.createReadStream('/path/to/gerber/file.gbr')
  .pipe(parser)
  .on('data', function(obj) {
    console.log(JSON.stringify(obj))
  })
```

To run this module in a browser, it should be bundled with a tool like [browserify][] or [webpack][]. If you are using the script tag installation method instead, there will be a global variable `gerberParser` available after you have included `gerber-parser.min.js`.

[browserify]: http://browserify.org/
[webpack]: https://webpack.js.org/

## api

See [API.md](./API.md)
