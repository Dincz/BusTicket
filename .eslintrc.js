module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["airbnb"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-console": "off",
        indent: ["error", 4],
        "linebreak-style": 0,
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
};
