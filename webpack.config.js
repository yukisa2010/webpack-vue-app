const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: "src",
                    from: "**/*.json",
                    to: path.resolve(__dirname, "dist")
                }
            ]
        })
    ]
};