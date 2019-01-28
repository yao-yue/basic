const path = require('path')                  //webpack.config.js是node脚本  可以引用node模块,灵活
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,   //支持js和jsx
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
      {
          test: /\.css/,
          include: [
              path.resolve(__dirname, 'src')
          ],
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
          test: /\.scss/,
          include: [
              path.resolve(__dirname, 'src')
          ],
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                  'css-loader',
                  'scss-loader',
              ],
          })
      },
      {
          test: /\.(png|jpg|gif)/,
          use: [
              {
                  loader: 'file-loader',
                  options: {},
              }
          ]  
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new UglifyPlugin(), 
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
    new HtmlWebpackPlugin({
        filename: 'index.html', // 配置输出文件名和路径
        template: 'assets/index.html', // 配置文件模板
      }),
  ],
}