module.exports = {
  printWidth: 100, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
};
