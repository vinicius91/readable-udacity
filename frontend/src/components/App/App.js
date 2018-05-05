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
  // overrides: {
  //   MuiAppBar: {
  //     root: {
  //       background: "linear-gradient(45deg, #FAFAFA 70%, #616161 99%)",
  //       color: "white"
  //     }
  //   },
  //   MuiExpansionPanel: {
  //     root: {
  //       marginBottom: "5px",
  //       marginTop: "5px"
  //     }
  //   },
  //   MuiExpansionPanelSummary: {
  //     root: {
  //       background: "linear-gradient(45deg, #D50000 35%, #EF5350 80%)",
  //       // background: "linear-gradient(45deg, #7F0019 30%, #df4428 90%)",
  //       color: "white"
  //     }
  //   },
  //   MuiBottomNavigation: {
  //     root: {
  //       background: "linear-gradient(45deg, #393939 1%, #f0f0f0 30%)",
  //       // background: "linear-gradient(45deg, #7F0019 30%, #df4428 90%)",
  //       color: "white"
  //     }
  //   },
  //   MuiListItemIcon: {
  //     color: "white"
  //   }
  // }
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
