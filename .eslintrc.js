module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
      'standard',
      'plugin:destructuring/recommended'
  ],
  plugins: [
    'html',
    'destructuring'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'destructuring/in-methods-params': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 4, {SwitchCase: 1}],
    'keyword-spacing': [2, {
      before: false,
      after: false,
      overrides: {
        "let": { "before": false, "after": true },
        "from": { "before": true, "after": true },
        "try": { "after": true },
        "case": { "after": true },
        "import": { "after": true },
        "export": { "after": true },
        "return": { "after": true },
        "else": { "before": true, "after": true },
        "catch": { "before": true, "after": true },
        "as": { "before": true, "after": true },
        "of": { "before": true, "after": true },
        "this": { "before": true, "after": false },
      }
    }],
    'space-before-function-paren': ["error", "never"]
  }
}
