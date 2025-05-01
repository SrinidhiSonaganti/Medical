module.exports = {
  env: {
    browser: true,   // For React app (client-side code)
    node: true,      // For Node.js (server-side code like Cloud Functions)
    es2021: true,    // This enables ECMAScript 2021 features like async/await, etc.
  },
  extends: [
    "eslint:recommended",         // Basic ESLint rules
    "plugin:react/recommended",   // React linting rules
    "plugin:node/recommended",    // Node.js linting rules
  ],
  parserOptions: {
    ecmaVersion: 12,     // Supports ECMAScript 2021 syntax
    sourceType: "module", // Support for `import/export` syntax
  },
  plugins: ["react"],    // React plugin
  rules: {
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^[A-Z_]+$" }],
  },
  globals: {
    require: "readonly",   // Tells ESLint to recognize `require` as a global variable
    module: "readonly",    // Tells ESLint to recognize `module` as a global variable
    exports: "readonly",   // Tells ESLint to recognize `exports` as a global variable
  },
};
