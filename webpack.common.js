const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

process.env.NODE_ENV = 'staging'
const envPath = `./environments/.env.${process.env.NODE_ENV}`

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html"
        }),
        new Dotenv({path: envPath})
    ],
}