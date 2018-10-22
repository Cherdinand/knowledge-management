### storybook

_ducoment:_  https://storybook.js.org/basics/introduction/

_knobs:_  https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs

_readme:_  https://github.com/tuchk4/storybook-readme

### storybook使用注意事项

版本： 3.4.10

_webpack_

`storybook中的webpack配置与create-react-app的配置大致相同。`

storybook提供自定义webpack配置的方法。也就是在.storybook文件夹中加入webpack.config.js。这里分两种情况：

1. 如果webpack.config.js中module.export返回的是对象的话，那么storybook将完全放弃内置的默认webpack配置而使用我们提供的webpack.config.js中的配置。

2. 如果webpack.config.js中module.export返回的是函数的话，那么代表storybook将会使用在使用默认的webpack配置的情况下extend（拓展）我们提供的webpack.config.js中的配置。

_babel_

既然webpack可以自定义，那么babel配置也是可以自定义的。

但这里需要注意，根据实践，`.babelrc文件官方文档中说放在.storybook目录下，实际上虽然读到了，但是babel配置不生效。后来将.babelrc文件提到项目根目录下（在这里就是e-widge）才会生效。`当然最后我觉得babel配置应该和webpack配置放在一起，所以创了个babel.config.js文件，在webpack.config.js文件中引用的折中方式。

个人理解：

`webpack会深度遍历项目中的文件夹，当检测到.js文件的时候会使用babel-loader对.js文件内容进行转换，而这个时候会检索到当前需要转译的.js文件所属的repository下的.babelrc配置（也就是说会如果当前.js文件所属的目录下存在.babelrc文件，babel-loader会读到它，但并不使用它，然后往上级找.babelrc文件，直到找到项目根目录，也就是有package.json的目录下的.babelrc文件，然后读取它并使用它作为babel配置，并停止继续往上寻找.babelrc文件。）`

按照上面的说法，就能理解为什么当我在storybook中的webpack配置中将babel-loader应用到node-modules的时候，会报某些babel plugin没有安装的错，因为node-modules里面的某些repository里有独立的.babelrc配置，所以babel-loader停止往上级寻找.babelrc并使用了repository里私有的babel配置。

```js
webpack配置：
{
    test: /\.(js|jsx)$/,
    use: "babel-loader",
    include: /e-component/
}
```

然后另外一个问题，为什么将.babelrc文件放在.storybook中读到了但没有生效的问题？我也解释不了。。。

但是将.babelrc放在e-widge目录下（也就是package.json）就可以生效的原因上面有说。

### 在html的head中插入标签

有些时候，我们需要在html的\<head\>中插入标签，例如当我们需要使用web font 或者加一些script的时候。

`前提：iframe元素内是一个完整的html。`

这里有两种情况：

1. 在.storybook目录下添加manager-head.html，这样可以把标签插入到整个storybook的html的head中。
1. 在.storybook目录下添加preview-head.html，这样可以把标签插入到storybook的预览区的iframe中的html的head中。

export const StorybookMeta = {
  anchors: [
    'storybook',
    'storybook使用注意事项',
    '在html的head中插入标签',
  ]
}