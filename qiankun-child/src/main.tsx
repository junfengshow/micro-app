/**
 * 子应用 入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, HashRouter, Link, Outlet } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Manage from './pages/Manage';

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

const ChildLayout = () => (
  <div>
    <Link to='/child' style={{marginRight: 10}}>子应用首页</Link>
    <Link to='/child/user'>用户</Link>
    <Outlet />
  </div>
)
const Menu = () => (
  <HashRouter>
    <Routes>
      <Route 
        path='/child' 
        element={
          <ChildLayout />
        }
      >
        <Route
          path='/child'
          element={<Home />}
        />
        <Route
          path='/child/user'
          element={<User />}
        />
      </Route>
      
      <Route 
        path='/manage'
        element={<Manage />}
      />
    </Routes>
  </HashRouter>
);

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

export async function mount (props: any) {
  console.log('mount', props)
  renderApp();
}

export async function unmount (props: any) {
  const { container } = props;
  if (typeof ReactDOM !== 'undefined') {
    console.log(container);
    ReactDOM.unmountComponentAtNode(container ? container.querySelector(`#${rootId}`) : document.querySelector(`#${rootId}`))
  }
}
