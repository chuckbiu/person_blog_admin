// webpack.config.js
const path = require('path');

module.exports = {
  // 其他配置...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/utils/')
    }
  }
};