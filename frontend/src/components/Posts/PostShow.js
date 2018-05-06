import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Grid, Col, PageHeader, Well } from 'react-bootstrap';
import CommentSection from '../Comments/CommentSection';
import { fetchPost } from '../../store/actions/postActions';

class PostShow extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId) {
      this.props.fetchPost(postId);
    }
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h3>Loading...</h3>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <PageHeader>
              {post.title}
              <br />
              <small>{post.author}</small>
            </PageHeader>
            <Well bsSize="large">
              <p>{post.body}</p>
            </Well>
          </Col>
        </Row>
        <CommentSection postId={post.id} />
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { post } = state.PostState.selectedPost;
  return {
    post
  };
}
export default connect(mapStateToProps, { fetchPost })(PostShow);
