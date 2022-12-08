const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const packageJson = require('./package.json');

const testFilesRegex = /\.test\.[jt]sx?$/;
const maxFileSize = 512000; // 512kb
const outputPrefix = `${packageJson.name}_${packageJson.version}`;

module.exports = (process) => {
    const isProduction = process.env === 'production';

    return {
        target: 'web',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: isProduction ? '/app/' : '/',
            filename: `${outputPrefix}_[name].js`,
            chunkFilename: `${outputPrefix}_[name].bundle.js`,
            clean: true,
        },
        mode: process.env,
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: ['babel-loader'],
                    exclude: [/node_modules/, testFilesRegex],
                },
                // no usage of ts-loader, we do not emit anything from tsc and let babel + presets transpile
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(jpe?g|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new ForkTsCheckerWebpackPlugin(),
            new MiniCssExtractPlugin(),
        ],
        devServer: {
            port: 3000,
            compress: true,
            open: true,
            watchFiles: 'src',
            historyApiFallback: true,
        },
        devtool: 'source-map',
        optimization: {
            minimize: isProduction,
            splitChunks: {
                chunks: 'all', // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
                maxSize: maxFileSize,
            },
        },
        performance: {
            maxEntrypointSize: maxFileSize,
            maxAssetSize: maxFileSize,
        },
    };
};
