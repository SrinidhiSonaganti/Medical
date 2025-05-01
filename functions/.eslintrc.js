module.exports = {
  env: {
    browser: true,   // For React app
    node: true,      // For Node.js-specific functions (Cloud Functions)
    es2021: true,    // Modern JavaScript syntax support (ECMAScript 2021)
  },
  extends: [
    "eslint:recommended",           // ESLint recommended rules
    "plugin:react/recommended",     // React-specific rules
    "plugin:node/recommended",      // Node.js-specific rules (for server-side code)
  ],
  parserOptions: {
    ecmaVersion: 12,     // ECMAScript 2021 syntax
    sourceType: "module", // For ES modules (import/export)
  },
  plugins: ["react"],  // React plugin to handle React rules
  rules: {
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^[A-Z_]+$" }],
  },
};
