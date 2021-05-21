'use strict'

const routes = ['/','/article','/archive','/categorytag','/tag','/friend','/about']

const SitemapPlugin = require('sitemap-webpack-plugin').default

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      // 本地前后端分离图片等静态资源路径重写
      '/uploads': {
        target: process.env.VUE_APP_BASE_API,
        pathRewrite: {
          '^/uploads': 'uploads'
        }
      },
      '/sitemap.xml': {
        target: process.env.VUE_APP_BASE_API,
        pathRewrite: {
          '^/sitemap.xml': 'sitemap.xml'
        }
      }
    },
  },
  configureWebpack: config => {
    return {
      plugins: [
        // new SitemapPlugin({
        //   base: 'localhost',
        //   paths: routes,
        //   options: {
        //     filename: 'sitemap.xml',
        //     lastmod: true,
        //     changefreq: 'weekly'
        //   }
        // })
      ]
    }
  }
}
