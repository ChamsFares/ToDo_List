const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        project: './src/Project.js',
        ToDoList: './src/ToDoList.js',
        storage: './src/Storage.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title:  'ToDo List',
        }),
        new MiniCssExtractPlugin({
          filename: './src/style.css',
        }),
    ],
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },

};