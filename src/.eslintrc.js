module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,  // Add this line to support Node.js variables like `require`, `exports`
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:node/recommended", // Optional: Enables Node.js linting rules
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^[A-Z_]+$" }],
  },
};
