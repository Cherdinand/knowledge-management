### 常用的命令

// 添加alias 获取head指针指向的分支

`git symbolic-ref HEAD`

// 设置别名，个性化一些默认设置

`git config --global alias.gethead "symbolic-ref HEAD"` 

// 除了 git log 信息之外，包含哪些文件被更改了，以及每个文件相对的增删行数。

`git log --stat`

// 合并缓存的修改和上一次的提交，用新的快照替换上一个提交。 --no-edit 不修改提交的信息。 只有--amend的时候是可以修改提交的信息的。

`git commit --amend --no-edit`

// 将当前分支 rebase 到 base分支，但使用可交互的形式。可以控制每个提交将会怎样被转移到新的基上去。你还可以对这些提交进行排序。

`git rebase -i [base]`

// 创建并查看 [new-branch]，但将 [existing-branch] 作为新分支的基，而不是当前分支。

`git checkout -b [new-branch] [existing-branch]`

// 即使能使用fast-forward进行合并也不使用，所有的合并都会产生一个新的merge commit记录。

`git merge --no-ff [branch]`

// git merge-base 命令非常方便地找出 feature 分支与master分支开始分叉的commit记录

`git merge-base feature master`

// 按提交信息xinxin来显示对应的commit log

`git log --grep="xinxin"`

// 按源代码中某一行的增加和删除来搜索提交

`git log -S "Hello, World!"`

// -u  为--set-upstream的缩写。标记将它添加为远程跟踪的分支，即与远程分支相对应，就可以用不带任何参数的 git push 来推送她的功能。

`git push -u origin marys-feature`

// 我们知道git pull = git fetch + git merge。而--rebase则是使用 git rebase 合并远程分支和本地分支，而不是使用 git merge

`git pull --rebase origin master`

// 查看本地仓库追踪远程仓库的状态

`git remote show origin`

// 清除所有失效的远程分支或根据提示删除特定失效分支

`git remote prune origin`

### 分支 & Tag & HEAD

分支: 指向分支内最新commit的引用。

Tag: 指向某个commit的引用。

HEAD: 指向branch或commit的引用。

其实，由于分支也是指向commit，所以实际上分支、Tag、HEAD都是指向commit的引用。

区别在于，分支指向的必定是当前分支内最新的commit，Tag指向的必定是当初指定的commit，而HEAD可以指向分支内历史中的任何一个commit（使用checkout [commit]）。

当我们刚checkout到某个分支的时候，实际上HEAD指向分支，然后都指向最新的commit。

当我们使用checkout [commit] 的时候，那么HEAD会进入[分离HEAD]状态。

### Useful Tutorial

[Pro Git](http://iissnan.com/progit/html/zh/ch1_1.html)

[git-recipes](https://github.com/geeeeeeeeek/git-recipes)

export const gitMeta = {
  anchors: [
    '常用的命令',
    '分支 & Tag & HEAD',
  ]
}