const path = require('path');

module.exports = {
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['prettier', 'react-hooks'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2016,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        browser: true,
        node: true
    },
    rules: {
        camelcase: 0,
        'no-console': 0,
        'no-debugger': 0,
        'no-unused-vars': 0,
        'no-underscore-dangle': 0,
        'no-extend-native': 0,
        'no-param-reassign': 0,
        'func-names': 0,
        'linebreak-style': ['error', 'windows'],
        'arrow-body-style': 0,
        'dot-notation': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/tabindex-no-positive': 0,
        'prefer-destructuring': 0,

        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/prefer-stateless-function': 0,
        'react/no-array-index-key': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 0,
        'react/no-unused-prop-types': 0,
        'react/no-did-mount-set-state': 0,
        'react/jsx-fragments': 0,
        'react/static-property-placement': 0,
        'react/state-in-constructor': 0,
        'react/jsx-props-no-spreading': [
            1,
            {
                html: 'enforce',
                custom: 'ignore'
            }
        ],
        'react/no-did-update-set-state': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-unused-state': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/sort-comp': 0,

        'import/prefer-default-export': 0
    }
};
