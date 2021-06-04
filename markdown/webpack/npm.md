1. 发scope包默认情况下是private的，如果要发到public可以加上 --access=public

``` js
yarn publish --access=public
```

1. npm与yarn的登录信息是不共享的。这意味着如果要用yarn进行某些登录后才能操作的功能，必须先把npm的登出，然后用yarn进行登录。

### npm组成

npm由三个部分组成：

1. npm网站。用于发现包，创建个人档案。

1. cli。可以直接在终端里运行，与npm进行交互的命令。

1. registry。注册表是所有包真正存储的地方。下载包的源。

### npm脚本
定义在package.json里面的scripts字段。scripts字段里面的每一个属性对应一段脚本。

``` js
{
  scripts: {
    "dev": "webpack-dev-server --mode=development"
  }
}
```

### npm脚本运行机制

npm 脚本的原理非常简单。`每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。`因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

`比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。`

这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 rimraf，只要直接写rimraf dist就可以了。而不用./node_modules/.bin/rimraf dist

### npm脚本执行顺序

如果是并行执行（即同时的平行执行），可以使用&符号。

``` js
$ npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

``` js
$ npm run script1.js && npm run script2.js
```

### npm钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

``` js
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

``` js
npm run prebuild && npm run build && npm run postbuild
```

### npm命令

_npm run_ 

每次启动npm run都会创建一个Shell，执行指定的命令，并临时将node_modules/.bin加入PATH变量，这意味着本地模块可以直接运行scripts字段里面的命令。`其实在.bin目录下的每个cmd文件内部都有链接指向对应的包。`

_npm link_ 

``` js
npm link Cherdinand-Cli  // 创建一个软链接
```

执行npm link会做两件事。

1. 它会在npm的全局模块安装文件夹node_modules内创建一个软链接，软链接指向Cherdinand-Cli项目地址。使Cherdinand-Cli全局可用。

1. 在本地项目中创建一个软链接，此软链接指向npm的全局模块安装文件夹node_modules内的软链接，最终指向Cherdinand-Cli项目地址。

_npm unlink_

``` js
npm unlink Cherdinand-Cli  // 删除一个软链接
```

> warn

> 踩到一个坑。 在用npm unlink的时候提示 404 NOT FIND "@sindresorhus/is@^0.7.0"

> 原因是之前是用yarn进行安装的，npm无法使用yarn产生的依赖，所以提示找不到@sindresorhus/is@^0.7.0（尽管确定了已经安装）。后来用npm install安装所有依赖解决这个问题

_npm info_

可以打印出指定包的具体信息。

``` js
npm info react
```

_npm bin_

可以显示npm的bin文件夹的位置

``` js
npm bin // D:\program\knowledge-management\node_modules\.bin
npm bin -g // C:\Users\HeZhi\AppData\Roaming\npm
```

### commander.js

> info

> package.json的bin字段对应的文件都是可执行文件（cmd）。在这里我们使用commandr.js来创建可执行文件。

commander.js提供了用户命令行输入和参数解析的强大功能，可以帮助我们简化命令行开发。拥有以下特点：

1. 参数解析。

1. 强制多态。

1. 可变参数。

1. Git 风格的子命令。

1. 自动化帮助信息。

1. 自定义帮助等。

### package.json

_files_

files字段的值是一个文件模式数组，`描述了我将这个项目打包的时候要包含哪些目录`。文件模式遵循与.gitignore类似的语法，但是相反：包括文件，目录或glob模式（*，** / *等）将使得文件在打包时包含在tarball中。省略该字段将使其默认为[“*”]，这意味着它将包含所有文件。

你可以添加.npmignore文件来忽略掉某些不需要打进包的文件或目录，如果没有添加.npmignore文件，那么就会使用.gitignore文件来代替。

_main_

main字段是当这个包是作为一个dependency的时候，这个包的entry文件。

_bin_

用来指定各个内部命令对应的可执行文件的位置。

模块安装的时候，若是全局安装，则npm会为bin中配置的文件在npm的全局模块安装文件夹node_modules的.bin目录下创建一个软连接；若是局部安装，则会在项目内的./node_modules/.bin/目录下创建一个软链接。

``` js
{
  "bin": {
    "e-cli": "./bin/index.js"  
  }
}
```

上面代码指定，e-cli 命令对应的可执行文件为 bin 子目录下的 index.tsx。Npm会寻找这个文件，在node_modules/.bin/目录下建立符号链接。在上面的例子中，index.js会建立符号链接npm_modules/.bin/e-cli。由于node_modules/.bin/目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。

_engines_

engines字段指明了该模块运行的平台。

``` js
比如 Node 的某个版本或者浏览器。
{ 
  "engines" : { "node" : ">=0.10.3 <0.12" } 
}
```

``` js
该字段也可以指定适用的npm版本。
{ 
  "engines" : { "npm" : "~1.0.20" }
 }
```

export const NpmMeta = {
  anchors: [
    'npm组成',
    'npm脚本',
    'npm脚本运行机制',
    'npm脚本执行顺序',
    'npm钩子',
    'npm命令',
    'commander.js',
    'package.json',
  ]
}
