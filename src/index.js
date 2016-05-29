import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './views/App';
import Home from './views/Home';
import Test from './views/Test';
import Login from './views/Login';
import MyTask from './views/MyTask';
import MyMain from './views/MyMain';
import ReleaseTask from './views/ReleaseTask';
import MyFocus from './views/MyFocus';
// import MyRelease from './views/MyRelease';

import {getCookie} from './utils';

const history = useRouterHistory(createHistory)({ basename: '' })
const store = configureStore();

const validate = function (next, replace, callback) {
  const isLoggedIn = !!getCookie('uid')
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" onEnter={validate}>
          <IndexRedirect to="home" />
          
          <Route component={App}>
            <Route path="home" component={Home}/>
          </Route>
          
          <Route component={App}>
            <Route path="test" component={Test}/>
          </Route>
          
          <Route component={App}>
            <Route path="myMain" component={MyMain}/>
          </Route>    
          
          <Route component={App}>
            <Route path="releaseTask" component={ReleaseTask}/>
          </Route>
          
          <Route component={App}>
            <Route path="myTask" component={MyTask}/>
          </Route>        
          
          <Route path="login" component={Login}/>
          
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
