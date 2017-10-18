import React, {PureComponent} from 'react';
import {Provider}             from 'react-redux';
import {
  Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import App from './App';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import store from './redux/store';
import history from './history';

export default class Routes extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App>
            <Redirect to='/category/all'/>
            <Switch>
              <Route path='/category/:category' component={PostList}/>
              <Route path='/:category/:post_id' component={PostDetail}/>
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  }
};
