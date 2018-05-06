import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Grid,
  Row,
  Col,
  PanelGroup,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { fetchPosts, sortBy } from '../../store/actions/postActions';
import PostListItem from './PostListItem';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      return _.map(posts, (post) => {
        return <PostListItem post={post} key={post.id} />;
      });
    }
    return <p>Loading...</p>;
  }

  handleSortClick(event, param) {
    this.props.sortBy(param);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <ButtonToolbar>
              <ButtonGroup className="pull-right">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="date">Sort by Date</Tooltip>}>
                  <Button
                    onClick={(event) =>
                      this.handleSortClick(event, 'timestamp')
                    }>
                    <Glyphicon glyph="sort" /> <Glyphicon glyph="calendar" />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="score">Sort by Vote Score</Tooltip>}>
                  <Button
                    onClick={(event) =>
                      this.handleSortClick(event, 'voteScore')
                    }>
                    <Glyphicon glyph="sort" /> <Glyphicon glyph="star" />
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
            </ButtonToolbar>
            <hr />
            <PanelGroup id="posts-index">{this.renderPosts()}</PanelGroup>
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

export default connect(mapStateToProps, { fetchPosts, sortBy })(PostIndex);
