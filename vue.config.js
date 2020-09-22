const path = require('path')

function resolve (dir) {
    // path.join(__dirname)设置绝对路径
    return path.join(__dirname, dir)
}

module.exports = {
    css: {
        loaderOptions: {
            less: {
                // 这里的选项会传递给 less-loader
                javascriptEnabled: true
            }

        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@views': resolve('./src/views'),
                '@router': resolve('./src/router'),
                '@assets': resolve('./src/assets'),
                '@store': resolve('./src/store'),
                '@components': resolve('./src/components'),
                '@layouts': resolve('./src/layouts'),
                '@utils': resolve('./src/utils')
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    } else {
                        const name = req.path && req.path.split('/api/')[1].split('/').join('_')
                        const mock = require(`./mock/${name}`)
                        const result = mock(req.method)
                        // 清理缓存
                        delete require.cache[require.resolve(`./mock/${name}`)]
                        
                        return res.send(result)
                    }
                }
            }
        }
    }
}
