## 子应用：

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
