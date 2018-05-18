### knowledge-management
a static web site using markdown...

### 使用规范

```js
 ### str    => h3 => anchor  use for title
 _str_      => em            use for sub title
 `str`      => inlineCode    use for emphysis
 > info     => blockquote    use for self-comprehension or tips
 
 str
 
 > warning  => blockquote    use for warning
 
 str
 
 **str**   => em             use for emphysis in info or warning
 
 import Location from '../images/location.png';
 <img src={Location} alt="Location" title="Location拆解图"/>   直接使用img标签在md中插入图片
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
```
