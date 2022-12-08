module.exports = {
    presets: [
        '@babel/preset-env',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic', // do not need to import react everywhere we use t/jsx
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ],
};
