import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories, setCategoryAndReloadBooks } from '../../actions/index';
import { categoriesPropType } from '../../models/categoryModel';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 120,
    backgroundColor: theme.palette.background.secondary
  }
});

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: '/',
      selectedName: 'All'
    };
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, item) => {
    this.setState({ selectedIndex: item.path, selectedName: item.name, anchorEl: null });
    if (item.path !== this.props.selectedCategory.path) {
      console.log(item);
      this.props.setCategoryAndReloadBooks(item);
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, categories } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Category"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary="Category" secondary={this.state.selectedName} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            selected={'All' === this.state.selectedIndex}
            onClick={event => this.handleMenuItemClick(event, { name: 'All', path: '/' })}
          >
            <Link to="/All">All</Link>
          </MenuItem>
          {categories.map(item => (
            <MenuItem
              key={item.path}
              selected={item.path === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, item)}
            >
              <Link to={item.path}>{item.name}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: categoriesPropType
};

function mapDispatchToProps(dispatch) {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    setCategoryAndReloadBooks: bindActionCreators(setCategoryAndReloadBooks, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    categories: state.categoryState.categories,
    selectedCategory: state.categoryState.selectedCategory
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavMenu));
