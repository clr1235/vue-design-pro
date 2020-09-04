module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 使用单引号
        quotes: [1, 'single'],
        // 不检查属性的驼峰命名
        camelcase: [2, { properties: 'never' }],
        // 单行的最大长度设置
        'max-len': [2, 120, 4, { ignoreUrls: true }],
        // 缩进默认使用4个空格
        indent: 'off',
        'no-unused-vars': 'off',
        'import/no-duplicates': 'off',
        'space-before-function-paren': 0,
        'no-trailing-spaces': ['off', {
            skipBlankLines: true,
            ignoreComments: true
        }],
        'padded-blocks': 0// 块语句内行首行尾是否要空行
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
