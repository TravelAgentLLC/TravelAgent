const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './react/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './react/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    proxy: {
      '/travelInfo': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/api/users/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/api/login': {
        target: 'http://localhost:3000',
        secure: false,
      },
      // proxy: {
      //   '/api/*': {
      //     target: 'http://localhost:3000',
      //     secure: false,
      //   },
    },
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(bin|glb|gltf)$/, // Match GLB and GLTF file extensions
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public', // Output path for the files
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },
};
