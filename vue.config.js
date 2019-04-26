module.exports = {
    devServer: {
        port: '8023',
        proxy: {
            '/proxy': {
                // target: 'https://ssc.gzeducard.net/proxy',
                // target: 'http://172.16.2.188:8070',
                target: 'http://172.16.4.248:8070',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        }
    }
};