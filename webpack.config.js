const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        project: './src/Project.js',
        dom: './src/DomMan.js',
        ToDoList: './src/ToDoList.js',
        storage: './src/Storage.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ToDo List',
        }),
    ],
    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

};