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

### npm与yarn

_著名的 node modules hell_

![node_module地狱](NodeModuleHell.jpg "600px")

`npm 的一个饱受诟病的问题是本地依赖管理算法的复杂性以及随之而来的性能、冗余、冲突等问题。`

1. `npm安装时会按照项目被依赖的次数作为权重，将依赖提升。`
1. `由于 node_modules 不能有效地处理重复的包，所以两个名称相同但是不同版本的包时不能在一个目录下共存的。`

``` js
# ① 假设项目依赖a,b,c三个模块, 依赖树为:
#  +- a
#    +- react@15
#  +- b
#    +- react@16
#  +- c
#    +- react@16
# npm安装时会按照项目被依赖的次数作为权重, 将依赖提升(hoisting),
# 安装后的node_modules结构为:
  .
  └── node_modules
      ├── a
      │   ├── index.js
      │   ├── node_modules
      │   │   └── react  # @15
      │   └── package.json
      ├── b
      │   ├── index.js
      │   └── package.json
      ├── c
      │   ├── index.js
      │   └── package.json
      └── react  # @16 被依赖了两次, 所以进行提升

# ② 现在假设在①的基础上, 根项目依赖了react@15, 对于项目自己的依赖肯定是要放在node_modules根目录的,
# 由于一个目录下不能存在同名目录, 所以react@16没有的提升机会. 
# 安装后node_moduels结构为
  .
  └── node_modules
      ├── a
      │   ├── index.js
      │   └── package.json # react@15 提升
      ├── b
      │   ├── index.js
      │   ├── node_modules
      │   │   └── react  # @16
      │   └── package.json
      ├── c
      │   ├── index.js
      │   ├── node_modules
      │   │   └── react  # @16
      │   └── package.json
      └── react  # @15
# 上面的结果可以看出, react@16出现了重复
```

_yarn_

和 npm 相比，Yarn 的主要优点有：

1. 安装速度：由于 Yarn 在安装依赖时采用的是并行操作，以及它在缓存依赖包时相比 npm 缓存的数据更完整，因此它在初次与重复安装依赖时，普遍都会比 npm 更快。
1. 稳定性：npm 5 引入的 package-lock 文件，在每次执行 npm install 时仍然会检查更新符合语义规则的依赖包版本，而 yarn.lock 则会严格保证版本的稳定性（尽管，yarn.lock 不能保证 node_modules 的拓扑稳定性）。
1. Plug'n'Play（PnP）：Yarn 2.0 发布了 PnP的功能（在更早期的 1.12 版本中就已实现）。PnP 方案具有提升项目安装与解析依赖的速度，以及多项目共享缓存（与普通缓存相比，免去了读写 node_modules 的大量 I/O 操作)，节省占用空间等优势。

_Plug'n'Play（PnP）_

按照普通的流程, npm / yarn 会生成一个 node_modules 目录, 然后 Node 按照它的模块查找规则在 node_modules 目录中查找.但实际上 Node 并不知道这个模块是什么, 它在 node_modules 查找, 没找到就在父目录的 node_modules 查找, 以此类推。这个效率是非常低下的。

`但是 Yarn 作为一个包管理器, 它知道你的项目的依赖树. 那能不能让 Yarn 告诉 Node? 让它直接到某个目录去加载模块.这样即可以提高 Node 模块的查找效率, 也可以减少 node_modules 文件的拷贝. 这就是Plug'n'Play的基本原理.`

使用 pnp 机制的以下优点:

1. 摆脱 node_modules.
1. 时间上: 相比较在热缓存(hot cache)环境下运行yarn install节省 70%的时间 
1. 空间上: pnp 模式下, 所有 npm 模块都会存放在全局的缓存目录下, 依赖树扁平化, 避免拷贝和重复
1. 提高模块加载效率. Node 为了查找模块, 需要调用大量的 stat 和 readdir 系统调用. pnp 通过 Yarn 获取或者模块信息, 直接定位模块.
1. 不再受限于 node_modules 同名模块不同版本不能在同一目录

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

bin 字段用来指定各个内部命令对应的可执行文件的位置。当package.json 提供了 bin 字段后，即相当于做了一个命令名和本地文件名的映射。

当用户安装带有 bin 字段的包时，

如果是全局安装，npm 将会使用符号链接把这些文件链接到/usr/local/node_modules/.bin/；
如果是本地安装，会链接到./node_modules/.bin/。

``` js
{
  "bin": {
    "e-cli": "./bin/index.js"  
  }
}
```

上面代码指定，e-cli 命令对应的可执行文件为其包内 bin 子目录下的 index.tsx。

而在安装了此包的项目中的node_modules/.bin/目录下会创建e-cli可执行文件。

`由于node_modules/.bin/目录会在运行时加入系统的PATH变量，因此在运行npm时，如果 ./bin/index.js 的文件以 #!/usr/bin/env node 开头（通知用node环境来执行此文件），就可以不带路径，直接通过命令来调用这些脚本。`

_config_

`config字段用于添加命令行的环境变量。`

``` js
例如我们在package.json中有如下字段
{
  "config": {
    "port": "8888",
    "name": "cherdinand"
  },
  "scripts": {
    "test": "node test.js",
  },
}

然后在test.js文件中就可以通过 process.env.npm_package_config_port 和 process.env.npm_package_config_name 获取到 8888 和 cherdinand
```

export const NpmMeta = {
  anchors: [
    'npm组成',
    'npm脚本',
    'npm脚本运行机制',
    'npm脚本执行顺序',
    'npm钩子',
    'npm命令',
    'npm与yarn',
    'commander.js',
    'package.json',
  ]
}
