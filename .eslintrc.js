module.exports = {
  root: true,
  // ESLint 会检测未声明的变量，并发出警告，但是有些变量是我们引入的库声明的，这里就需要提前在配置中声明。
  // globals: {
  //   "React": false  // true表示该变量为 writeable，而 false 表示 readonly
  // }
  // 但是在globals中一个个的进行声明未免有点繁琐，这个时候就需要使用到env，这是对一个环境定义的一组全局变量的预设。
  env: {
    es6: true, // 所有除了modules的es6功能
    browser: true, // 浏览器全局变量
    node: true, // node全局变量
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module', // es6的modules功能需要在这里添加
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  // rules里配置的规则是优先于extends数组里的配置的，相当于自定义项目配置
  rules: {
    'prettier/prettier': 'error', // 把prettier当成eslint的一个rules
    'react/react-in-jsx-scope': 'off', // 允许jsx文件中没有import React
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
  },
  // extends可以使用别人配置好的rules
  extends: [
    'eslint:recommended', // eslint推荐的常用rules，可以上官网查看具体包含内容
    'plugin:react/recommended', // react插件中常用rules，可以上官网查看具体包含内容
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 停用eslint中会与prettier起冲突的配置。需要在extends数组的最后，因为extends数组后面的规则会覆盖前面的
  ],
  // 安装的插件可以在eslint的内置rules外扩展新的规则，但是扩展的规则默认是不开启的，如果要使用需要在rules/extends中配置启用
  plugins: [
    'prettier', // eslint集成prettier，把prettier当成eslint的一个rules。这样只需执行eslint就可以顺便执行prettier
    'react', // 引入react的
    '@typescript-eslint', // 引入typescript的
  ],
  // 为了解决这个warning加了settings：React version not specified in eslint-plugin-react settings
  settings: {
    react: {
      version: 'detect',
    },
  },
};
