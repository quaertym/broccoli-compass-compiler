# broccoli-compass-compiler

Compass Compiler for Broccoli

### Installation

```bash
npm install --save broccoli-compass-compiler
```

### Usage

```javascript
var compileCompass = require('broccoli-compass-compiler');
var tree = compileCompass(['app/styles'], {
  outputStyle: 'compressed'
});
```
