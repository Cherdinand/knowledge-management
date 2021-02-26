### React.PureComponent

Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。 `它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。`

``` js
// 测量Block组件的性能
<Profiler
  id="Block"
  onRender={( 
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 React.memo，useMemo，shouldComponentUpdate）。
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间戳
    commitTime, // 本次更新中 React committed 的时间戳
    interactions // 属于本次更新的 interactions 的集合
  ) => {
    console.log( "props,", id, phase, actualDuration, baseDuration, startTime, commitTime, interactions );
  }}
>
  <Block num={index} />
</Profiler>
```

export const ProfilerMeta = {
  anchors: [
    'React.PureComponent',
  ]
}