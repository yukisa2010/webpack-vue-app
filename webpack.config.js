const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

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
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /.css$/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
          }
        ]
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
        }),
        new VueLoaderPlugin()
    ]
};