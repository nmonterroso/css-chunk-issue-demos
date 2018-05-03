const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildPath = `${__dirname}/dist`;

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        app: ['index.js'],
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            `${__dirname}/src`,
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: `${__dirname}/src`,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-class-properties', 'syntax-dynamic-import',]
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ],
    },
    serve: {
        host: '0.0.0.0',
        port: 3001,
        hot: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([{
            from: `${__dirname}/src/index-combine.html`,
            to: `${buildPath}/index.html`
        }])
    ],
};
