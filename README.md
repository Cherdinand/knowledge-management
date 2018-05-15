### knowledge-management
d a static web site using markdown...

### 使用规范

```js
 ### str => h3 => anchor  use for title
 _str_   => em            use for sub title
 `str`   => inlineCode    use for emphysis
 > str   => blockquote    use for self-comprehension
```

### 目录结构

- common    
  - components          项目公用组件
- markdown              markdown文件
- public          
- src 
  - components          除markdown显示还需要其他功能（如console，css的playground）的container
  - cherComponents      cherComponent这种不需要markdown显示的container
  - css                 markdown的code区域的主题css
  - ui                  mdx中markdown的自定义ui展示
  - router              路由配置

