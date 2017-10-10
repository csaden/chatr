import React, {PureComponent} from 'react';
import {Provider}             from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';

import App from './App';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import store from './redux/store';

export default class Routes extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App>
            <Redirect to='/category/all'/>
            <Route path='/category/:category' component={PostList}/>
            <Route path='/post/:id' component={PostDetail}/>
          </App>
        </Router>
      </Provider>
    );
  }
};
