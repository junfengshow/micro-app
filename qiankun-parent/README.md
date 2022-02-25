
## qiankuan 主应用

### 1.方式一
```js
import { registerMicroApps, start } from 'qiankun';

// 注册
registerMicroApps([
  {
    name: 'qiankun-child',
    container: '#child',
    entry: 'http://localhost:8889',
    activeRule: '#/child'
  },
]);
// 启动
start();
```

#### registerMicroApps(apps, lifeCycles?)的参数
apps: IAppItem[]

```typescript
interface IAppItem {
  // 微应用的名称，微应用之间必须唯一
  name: string;
  // 微应用入口
  entry: string ｜ { scripts?: string[]; styles?: string[]; html?: string };
  // 微应用挂载的节点
  container: string|HTMLElement;
  // 微应用的激活规则
  activeRule: string|(location: Location) => boolean | Array<string | (location: Location) => boolean;
  // loading状态发生变化时调用该方法
  loader?: (loading: boolean) => void;
  // 主应用需要传递给微应用的数据。
  props?: object;
}
```


### 2.方式二
```js
import { loadMicroApp } from 'qiankun';
const LoadApp = () => {
  const ref = useRef();
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