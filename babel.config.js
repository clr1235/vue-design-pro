module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'import',
            {
                libraryName: 'antd-design-vue',
                libraryDirectory: 'es',
                style: true
            }
        ]
    ]

}
