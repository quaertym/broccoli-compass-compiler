var CachingWriter = require('broccoli-caching-writer');
var Compass = require('compass-compile');
var merge = require('merge');
var includePathSearcher = require('include-path-searcher');

CompassCompiler.prototype = Object.create(CachingWriter.prototype);
CompassCompiler.prototype.constructor = CompassCompiler;

function CompassCompiler(inputTrees, inputFile, outputFile, options) {
  options = options || {};
  if (!(this instanceof CompassCompiler)) { return new CompassCompiler(inputTrees, inputFile, outputFile, options); }
  if (!Array.isArray(inputTrees)) { throw new Error('Expected array for first argument - did you mean [tree] instead of tree?'); }

  if (options.importPath && Array.isArray(options.importPath) && options.importPath.length > 0) {
    inputTrees = inputTrees.concat(options.importPath);
  }

  CachingWriter.call(this, inputTrees, {
    annotation: options.annotation
  });

  this.defaultOptions = {
    importPath: [],
    getSassDir: function(inputTrees, inputPaths) {
      // Check the input paths for the existence of the input file
      var file = includePathSearcher.findFileSync(inputFile, inputPaths);

      // Compass compiler only needs the directory
      return path.dirname(file);
    },
    getCssDir: function(outputPath) {
      return outputPath;
    }
  };

  this.inputFile = inputFile;
  this.outputFile = outputFile;
  this.inputTrees = inputTrees;
  this.options = options;
  this.compass = new Compass();
}

CompassCompiler.prototype.getOptions = function() {
  var compassOptions = merge({}, this.defaultOptions, this.options);
  compassOptions.sassDir = compassOptions.getSassDir(this.inputTrees, this.inputPaths);
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
