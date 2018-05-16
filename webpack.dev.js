const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

const happyThreadPool = HappyPack.ThreadPool({
  size: 8
}); // webpack2 支持打包css
module.exports = {
  devtool: "eval", // 构建方式，eval 构建速度最快，不支持生产环境
  // 程序入口文件，多页面构建
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:3000", // dev 代码热替换
      "webpack/hot/only-dev-server", // dev 代码热替换
      "./src/main" // 入口文件
    ]
  },
  // 解析路径
  resolve: {
    root: path.resolve("src"),
    extensions: ["", ".js", ".jsx"]
  },
  // 文件打包结果
  output: {
    path: path.join(__dirname, "dist"), // 打包好的资源位置
    filename: "[name].js", // 这里的 name 对应入口文件里的值
    chunkFilename: "[name].[chunkhash:8].chunk.js", // 这里 name 对应 为出现在入口文件的打包文件，如异步加载的子路由
    publicPath: "/" // 使用url-loader 加载资源的前缀 .比如图片的前缀使用cdn
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"'
    }),
    new OpenBrowserPlugin({ url: "http://localhost:3000" }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "[name].chunk.js"
    }),
    new HappyPack({
      id: "js",
      threadPool: happyThreadPool,
      loaders: ["react-hot", "babel?cacheDirectory=true"] // 加载器类型 react 热替换
    }),
    new HappyPack({
      id: "styles",
      threadPool: happyThreadPool,
      loaders: ["style-loader!css-loader!postcss-loader!sass-loader"]
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dll/vendor-manifest.json")
    }),
    new HtmlWebpackPlugin({
      // 根据模板插入css/js等生成最终HTML
      favicon: "./public/favicon.png", // favicon路径
      filename: "./index.html", // 生成的html存放路径，相对于 path
      template: "./index.html", // html模板路径
      inject: true, // 允许插件修改哪些内容，包括head与body
      hash: true, // 为静态资源生成hash值
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false // 删除空白符与换行符
      }
    })
  ],
  postcss: function() {
    return [require("autoprefixer"), require("precss")];
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // 用正则表达式匹配文件格式
        loaders: ["happypack/loader?id=js"], // 多进程打包
        include: path.join(__dirname, "src")
      },
      {
        test: /\.(css|scss)$/,
        loader: "style!css!sass"
        //loaders:['happypack/loader?id=styles'], //多进程打包
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=10000"
      }
    ]
  }
};
