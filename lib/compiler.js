var CachingWriter = require('broccoli-caching-writer');
var Compass = require('compass-compile');

CompassCompiler.prototype = Object.create(CachingWriter.prototype);
CompassCompiler.prototype.constructor = CompassCompiler;

function CompassCompiler(inputTrees, options) {
  if (!(this instanceof CompassCompiler)) { return new CompassCompiler(inputTrees, options); }
  if (!Array.isArray(inputTrees)) { throw new Error('Expected array for first argument - did you mean [tree] instead of tree?'); }

  CachingWriter.call(this, inputTrees, {
    annotation: options.annotation
  });

  this.defaultOptions = {
    getSassDir: function(inputPaths) {
      return inputPaths[0];
    },
    getCssDir: function(outputPath) {
      return outputPath;
    }
  };

  this.options = options || {};
  this.compass = new Compass();
}

CompassCompiler.prototype.getOptions = function() {
  var compassOptions = Object.assign({}, this.defaultOptions, this.options);
  compassOptions.sassDir = compassOptions.getSassDir(this.inputPaths);
  compassOptions.cssDir = compassOptions.getCssDir(this.outputPath);
  delete compassOptions.getSassDir;
  delete compassOptions.getCssDir;
  return compassOptions;
};

CompassCompiler.prototype.build = function() {
  var compassOptions = this.getOptions();
  return this.compass.compile(compassOptions);
};

module.exports = CompassCompiler;
