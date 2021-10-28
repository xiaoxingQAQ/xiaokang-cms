module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'views': '@/views',
      }
    }
  },
  // 代理
  devServer: {
    // proxy: 'http://192.168.124.20:9600/',
  }
}