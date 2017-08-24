import React, {Component} from 'react';
import {connect} from 'react-redux';

import {categories} from './components/app-prop-types';
import Sidebar from './components/Sidebar/Sidebar';
import {CATEGORIES_REQUESTED} from './redux/types';
import './App.css';

class App extends Component {

  static propTypes = {
    categories: categories
  }

  static defaultProps = {
    categories: []
  }

  state = {
    selected: 'all'
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: CATEGORIES_REQUESTED});
  }

  handleSelectCategory = (selected) => {
    this.setState({selected});
  }

  render() {
    const {categories} = this.props;
    const {selected} = this.state;

    return (
      <div className='flex'>
        <Sidebar
          className='sidebar'
          categories={categories}
          selected={selected}
          onSelectCategory={this.handleSelectCategory}/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
};

const AppWithRedux = connect(
  (state) => ({categories: state.categories})
)(App);

export {
  AppWithRedux as default,
  App
};
