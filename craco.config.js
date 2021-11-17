// craco.config.js
const path = require(`path`);
const CracoAlias = require("craco-alias");
// const alias = require(`./src/config/aliases`);

// const SRC = `./src`
// const aliases = alias(SRC)

// const resolvedAliases = Object.fromEntries(
//   Object
//     .entries(aliases)
//     .map( ([key, value]) =>
//       [key, path.resolve(__dirname, value)]
//     ),
// )
const SOURCE_PATH = path.resolve(__dirname, 'src');
const PUBLIC_PATH = path.resolve(__dirname, 'public');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        // baseUrl SHOULD be specified
        // plugin does not take it from jsconfig
        baseUrl: "./src"
      }
    }
  ],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
