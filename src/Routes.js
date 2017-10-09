import React, {PureComponent} from 'react';
import {Provider}             from 'react-redux';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';

import history from './browser-history';
import App from './App';
import PostList from './components/PostList';
import store from './redux/store';

export default class Routes extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App>
            <Redirect to='/category/all'/>
            <Route path='/category/:category' component={PostList}/>
          </App>
        </Router>
      </Provider>
    );
  }
};
