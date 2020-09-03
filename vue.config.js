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
                '@layouts': resolve('./src/layouts')
            }
        }
    }
}
