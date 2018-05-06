import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import _ from 'lodash';
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import { fetchPosts } from '../../store/actions/postActions';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return _.map(posts, (post) => {
        const { id, title, author, category } = post;
        return (
          <div key={id}>
            <LinkContainer to={`/${category}/${id}`}>
              <ListGroupItem header={title}>
                Author: {author} | Category: {category}
              </ListGroupItem>
            </LinkContainer>
          </div>
        );
      });
    }
    return <p>Loading...</p>;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <ListGroup>{this.renderPosts()}</ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { category } = ownProps.match.params;
  let posts = [];
  if (category === undefined || category === 'All') {
    posts = state.PostState.posts;
  } else {
    posts = state.PostState.posts.filter((post) => post.category === category);
  }
  return {
    posts: posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
