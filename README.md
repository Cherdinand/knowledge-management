### knowledge-management
a static web site using markdown...

### 使用规范

``` js
 ### str    => h3 => anchor  use for title
 _str_      => em            use for sub title
 `str`      => inlineCode    use for emphysis
 > info     => blockquote    use for self-comprehension or tips
 
 str
 
 > warning  => blockquote    use for warning
 
 str
 
 **str**   => em             use for emphysis in info or warning
 
 ![看不见的客人](InvisibleGuest.png "500px")  图片使用react-medium-image-zoom进行放大观看处理
```

### 目录结构

``` js
- common
  - components          项目公用组件
- markdown              markdown文件
- public
- src
  - components          除markdown显示还需要其他功能（如console，css的playground）的container
  - cherComponents      cherComponent这种不需要markdown显示的container
  - ui                  mdx中markdown的自定义ui展示
  - router              路由配置
- .gitattributes        每当有文件保存或者创建时，git 会根据指定的属性来自动地保存。 其中的一个属性是 eol(end of line)，用于配置文件换行符
- .eslintrc             检查 JavaScript 代码质量的工具。可以定义代码风格规则、语法检查规则、代码错误检查规则等。
- .prettierrc           代码格式化工具。可以定义代码格式化规则，例如缩进、换行符、引号等。
- .editorconfig         编辑器配置，用于使使用不同编辑器的开发成员能够拥有相同的基本格式规范，如缩进、换行符、编码
```