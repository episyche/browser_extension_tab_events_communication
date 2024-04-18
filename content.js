if (chrome.runtime) {
  console.originalWarn = console.warn;
  console.warn = function () {
      if (arguments.length == 1 && typeof arguments[0] === 'string' && arguments[0].startsWith('Manifest v2 support is deprecated and will be removed in a future version of Chrome.')) {
          return;
      } 
  };
}