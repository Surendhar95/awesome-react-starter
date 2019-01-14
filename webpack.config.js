const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
module.exports = {
  entry: [
     'babel-polyfill',
     './src'
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  output: {
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: './src'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
                    presets: ['es2015', 'stage-2', 'react']
                 }
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                context: '../assets',
                name: 'root[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes')
              ],
            },
          },
        ],
      },
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify("staging") })
  ]
};
