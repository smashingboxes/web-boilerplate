// Include all JS and JSX files except the index.js because that file
// attempts to add the element to a DOM node which doesn't exist in the
// test environment.
const context = require.context('./src', true, /^(?!\.\/index\.jsx$).*\.jsx?$/);
context.keys().forEach(context);
