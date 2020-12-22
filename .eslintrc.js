module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"],
                "extensions": [".js", ".jsx", ".vue", ".json"]
            }
        }
    },
    "rules": {
        "semi": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "jsx-quotes": 0,
        "indent": 0,
        "space-before-function-paren": 0,
        "no-trailing-spaces": ["error", {"skipBlankLines": true}],
        "object-curly-spacing": ["error", "never"],
        "quote-props": 0,
        "quotes": ["error", "single"],
        "camelcase": ["error", {"properties": "never"}],
        "arrow-parens": ["error", "always"],
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        "import/no-unresolved": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "no-else-return": 0,
        "no-param-reassign": ["error", {"props": false}],
        "arrow-body-style": 0
    }
};
