var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [ // 入口
    'webpack-hot-middleware/client', // 加载 node_modules/webpack-hot-middleware/client.js 文件， 加载这个文件后 webpack 会通过iframe帮助我们做热加载
    './src/index'
  ],
  output: { // 出口
    path: path.join(__dirname, 'dist'), // 指定文件配置后的目录 在本项目中并没有把 bundle.js 生成在磁盘上，而是生成在内存上，在读取 bundle.js 是从内存读取，并返回
    filename: 'bundle.js', // 编译成 bundle.js 的文件
    publicPath: '/dist' // 部署到服务器上会部署的路径, 在 index.html 上引入是加上 dist目录 <script src="/dist/bundle.js"></script>
  },
  plugins: [ // 插件
    //new webpack.optimize.OccurenceOrderPlugin(), // 按照引用程度来排序各个模块，引用的越频繁id就越短，达到减小文件大小的效果
    //new webpack.optimize.UglifyJsPlugin(), // 用于压缩输出js代码
    //new webpack.optimize.AggressiveMerginPlugin(), // 用来优化生成的代码段，合并相似的代码。
    new webpack.HotModuleReplacementPlugin(), // 本地开发调试的热更新
    new webpack.NoErrorsPlugin(), // 用于保证编译过程不出错
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development') // 用来检测相似的文件，或者文件中重复的内容，将冗余在output中消除
    })
  ],
  resolve: { // 模块解析配置项，
    extensions: ['', '.js', '.jsx'] // 解析的后缀
    // alias:{ 'style': __dirname + /src/styles} // 解析路径或名字指定一个更加简短的别名 
  },
  module: { // 定义影响各个 module 的选项
    loaders: [ // 定义 loaders 后可以在js文件中 require js、img 文件
      {
        test: /\.js$/, // 文件后缀正则
        loaders: ['babel'], // 使用 babel 加载， 简单理解，把 es6 代码转成 es5 代码，让浏览器理解
        exclude: /node_modules/, // 排除 node_modules 目录
        include: __dirname
      },
      {
        test: /\.less?$/,
        loaders : [
          'style-loader',
          'css-loader', // 处理css文件
          'less-loader?{"sourceMap":true}'
        ],
        include: __dirname
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url', // 返回文件最终url地址
        query: {limit: 10240} // 文件大小小于多少后，直接返回文件的 base64 的值 
      }
    ]
  }
};
