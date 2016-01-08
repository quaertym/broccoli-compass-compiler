# broccoli-compass-compiler

Compass Compiler for Broccoli

### Installation

```bash
npm install --save broccoli-compass-compiler
```

### Usage

```javascript
var compileCompass = require('broccoli-compass-compiler');
var tree = compileCompass(['app/styles'], 'addon.scss', 'path/to/output.css' {
  outputStyle: 'compressed'
});
```
