# 微前端

## qiankun

### 1.umi
umi 通过plugin集成了qiankun，可以很快速的使用。
既可以通过路由的方式引入微应用，也可以按组件的方式，总之就是方便。

### 2.qiankun 自己看文档配置
[文档](https://qiankun.umijs.org/zh/api)

+ qiankun-parent: 主应用
+ qiankun-child: 子应用

> 配合react-router-dom 配置出页面级别的微应用。同时微应用内部同样可以切换路由，从而支持将整个模块嵌入主应用。

### 主应用：
两种方式引入子应用:
+ 1.registerMicroApps
```js
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'qiankun-child',
    container: '#child',
    entry: 'http://localhost:8889',
    activeRule: '#/child'
  },
]);
start()
```

+ 2.loadMicroApp
```jsx
const LoadApp = () => {
  const ref = useRef();
  console.log('this is LoadApp')
  useEffect(() => {
    let res = loadMicroApp({
      name: 'qiankun-child',
      container: ref.current,
      entry: 'http://localhost:8889',
    })
    return () => {
      res.unmount()
    }
  }, []);
  return (
    <div ref={ref} />
  )
}
```

详细配置见qiankun-parent

### 子应用：

```js
// main.js
// ...
const rootId = 'child-app';

const renderApp = () => {
  const node = document.getElementById(rootId);
  ReactDOM.render(<Menu />, node);
};

if (!window.__POWERED_BY_QIANKUN__) {
  renderApp();
}

export async function bootstrap () {
  console.log('[react 16] react app bootstraped')
}

export async function mount (props) {
  renderApp(props);
}

export async function unmount (props) {
  const { container } = props;
  if (typeof ReactDOM !== 'undefined') {
    ReactDOM.unmountComponentAtNode(container ? container.querySelector(`#${rootId}`) : document.querySelector(`#${rootId}`))
  }
}
```

> qiankun会适时主动调用main入口暴露出的这几个方法。其中在mount的时候进行组件渲染，在unmount的时候将组件销毁。

webpack配置也需要增强
```js
configs.output = {
  path: join('dist'),
  filename: '[name].js',
  //这里
  library: `${packageName}-[name]`,
  libraryTarget: 'umd',
  chunkLoadingGlobal: `webpackJsonp_${packageName}`
}
```

