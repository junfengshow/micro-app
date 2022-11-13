/**
 * 应用总入口
 */
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter, Link } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';

import { registerMicroApps, start, loadMicroApp } from './qiankunLocal';

registerMicroApps([
  {
    name: 'qiankun-child',
    container: '#child',
    entry: 'http://localhost:8889',
    activeRule: '#/child'
  },
]);

start();

const LoadApp = () => {
  const ref = useRef<any>();
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

const Menu = () => (
  <HashRouter>
    <ul>
      <li><Link to='/'>首页</Link></li>
      <li><Link to='/user'>用户</Link></li>
      <li><Link to='/child'>子应用</Link></li>
      <li><Link to='/manage'> manage </Link></li>
    </ul>
    <Switch>
      <Route
        path='/'
        component={Home}
        exact
      />
      <Route
        path='/user'
        component={User}
      />
      <Route
        path='/child'
        render={() => <div id='child' />}
      />
      <Route 
        path='/manage'
        component={LoadApp}
      />
    </Switch>
  </HashRouter>
)

const node = document.getElementById('app');
ReactDOM.render(<Menu />, node);
