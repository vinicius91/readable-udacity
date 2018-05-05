import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import NavMenu from './NavMenu';

import logo from '../../assets/images/logo.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: 'none'
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

class Navigation extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Avatar alt="Readable" src={logo} className={classes.avatar} />
            <Typography variant="title" color="inherit" className={classes.flex}>
              Readable
            </Typography>
            <NavMenu />
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
