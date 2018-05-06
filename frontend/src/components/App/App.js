import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../../store/store';
import PostIndex from '../Posts/PostIndex';
import PostNew from '../Posts/PostNew';
import PostShow from '../Posts/PostShow';
import Header from '../Shared/Header';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/posts/new" component={PostNew} />
              <Route path="/:category/:postId" component={PostShow} />
              <Route path="/:category" component={PostIndex} />
              <Route path="/" component={PostIndex} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
