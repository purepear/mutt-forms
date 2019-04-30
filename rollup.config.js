import resolve from "rollup-plugin-node-resolve"
import json from "rollup-plugin-json"
import babel from "rollup-plugin-babel"
import uglify from "rollup-plugin-uglify"

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/mutt-forms.es.js",
      format: "es"
    },
    {
      file: "dist/mutt-forms.min.js",
      format: "iife",
      exports: "default",
      name: "Mutt"
    }
  ],
  plugins: [
    resolve(),
    json(),
    babel({
      exclude: [
        'node_modules/**',
        '*.json',
      ],
    }),
    uglify({
      mangle: false,
      keep_classnames: true,
      keep_fnames: true,
      safari10: true
    })
  ]
}
