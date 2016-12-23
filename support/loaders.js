const nullExtensions = ['.css', '.scss', '.sass', '.png', '.jpg', '.svg'];

nullExtensions.forEach(function(extension) {
  require.extensions[extension] = function() {};
});
