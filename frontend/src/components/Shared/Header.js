import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  NavbarBrand, //eslint-disable-line no-unused-vars
  NavbarHeader, //eslint-disable-line no-unused-vars
  Nav,
  NavItem,
  NavDropdown
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchCategories } from '../../store/actions/categoriesActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'all'
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleOnSelectItem(event) {
    console.log(event);
  }

  renderMenuItens(categories) {
    if (!categories) {
      return;
    } else {
      return categories.map((category) => {
        return (
          <LinkContainer to={`/${category.path}`} key={category.path}>
            <NavItem
              eventKey={`/${category.path}`}
              onClick={this.handleOnSelectItem}>
              {category.name}
            </NavItem>
          </LinkContainer>
        );
      });
    }
  }

  render() {
    const { activeKey } = this.state;
    const { categories } = this.props;
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>Readable</Navbar.Brand>
            </LinkContainer>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/posts/new">
              <NavItem eventKey={'new'}>New Post</NavItem>
            </LinkContainer>
            <NavDropdown
              eventKey={'category'}
              title="Categories"
              id="category-dropdown"
              activeKey={activeKey}>
              <LinkContainer to="/All">
                <NavItem eventKey={'/All'}>All</NavItem>
              </LinkContainer>
              {this.renderMenuItens(categories)}
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.CategoryState.categories
  };
}

export default connect(mapStateToProps, { fetchCategories })(Header);
