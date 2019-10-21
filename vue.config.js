/*
 * @Description: 
 * @Author: mawei
 * @Github: 
 * @Since: 2019-07-04 16:13:47
 * @LastEditors: mawei
 * @LastEditTime: 2019-08-16 17:24:06
 */
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ['js', 'css']


module.exports = {
    parallel: false,
    productionSourceMap: false,
    configureWebpack: {
        module: {
            rules:[
                {
                    test: /worker\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'worker-loader',
                        options: {
                            name: '[hash:32]-[name].js',
                            inline: true, 
                            fallback: false,
                        }
                    }
                },
                {
                    test: /\.(doc|docx|webm|ogg|wav|flac|aac)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name:'[name].[ext]',
                    }
                },
            ]
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    devServer: {
        proxy: {
            '/pay': {
                // target: 'http://192.168.10.119:8080/pay/',
                // target: 'http://172.16.15.176:8080/pay/',
                target: 'http://18.140.5.142:8080/pay/',
                // target: 'http://103.75.2.200/pay/',
                // target: 'http://192.168.10.54:8080/pay/',
                // target: 'http://www.zhima2-dev.com/pay/',
                // target: 'http://www.royalbiz.co/pay/',
                // target: 'http://52.77.226.129:8080/pay/',
                // target: 'http://192.168.10.12:8085/pay/',
                // target:'http://192.168.10.172:5210/pay/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/pay': ''
                }
            },
            '/websocket/' :{
                // 11080 20080
                // target: 'http://192.168.10.172:11080',
                // target: 'http://192.168.10.172:11080',
                // target: 'http://192.168.10.172:5210/websocket/',
                // target: 'http://www.zhima2-dev.com/websocket',
                target: 'http://www.royalbiz.co/websocket',
                // target: 'http://192.168.10.172:5210/',
                // target: 'http://192.168.10.125:5000/websocket',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/websocket': ''
                }
            }
        }
    }
}