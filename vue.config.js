const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: '8088',
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://101.43.140.200:3000',  // 后台接口地址
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': '',
        }
      },
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-element-plus/webpack')()
    ]
  },
  transpileDependencies: true
})
