import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightGreen from 'material-ui/colors/lightGreen';
import deepOrange from 'material-ui/colors/deepOrange';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: amber,
    error: red,
    alert: deepOrange
  }
});
class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/:category" component={Home} />
          <Route exact path="/:category/:post_id" component={Home} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
