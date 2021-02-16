module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true
            }
        },
        '@storybook/addon-controls',
        './webpack-config-preset.js'
    ],
    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript'
    }
};
