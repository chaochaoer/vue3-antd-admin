const path = require('path');
const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir);
}
const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 3000,
    proxy: {
      "^/MOCK_API": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { "^/MOCK_API": "" },
        bypass: function (req, res, proxyOptions) {
          let result = {}
          try {
            let dir = req.url.split("?")[0].split("/")
            if (dir.includes("MOCK_API")) dir = dir.slice(2)
            else dir = dir.slice(1)
            let fn = dir.pop()
            let currentPath = path.join(__dirname, "src/mock/", dir.join("/"));
            let fns = require(currentPath)
            result = fns[fn](req, res)
            delete require.cache[require.resolve(currentPath)];
          } catch (err) { }
          return res.send(result)
        },
      },
    },
  },
  publicPath: './',
  css: {
    loaderOptions: {
      // 配置scss
      scss: {
        additionalData: "@import '~@/styles/variables.scss';"
      }
    }
  },
  configureWebpack: {
    // title 标题
    name: process.env.VUE_APP_BASE_NAME,
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
    }
    // externals: isProd ? cdn.externals : {}
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     jquery: "jquery",
    //     "window.jQuery": "jquery"
    //   })
    // ]
  },
  chainWebpack(config) {
    // 设置svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // 设置开发环境sourceMap
    config.when(!isProd, config => config.devtool('cheap-source-map')); // 打包大小分析
    config.when(isProd, config => {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    });
  }
})
