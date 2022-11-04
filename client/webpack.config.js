const HtmlWebpackPlugin = require('html-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const path = require('path');

module.exports = { 
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
        }
      }
    ]
  },
    plugins: [
        new InjectManifest({
          swSrc: './sw.js',
          swDest: 'service-worker.js',
        }),
        new HtmlWebpackPlugin({
          template: './index.html',
          title: 'Contact-Cards',
        })
      ]
      
}