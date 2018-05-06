import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Grid,
  Col,
  PageHeader,
  Well,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { fetchPost, fetchPostComments } from '../../store/actions/postActions';

class PostShow extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId) {
      this.props.fetchPost(postId);
      this.props.fetchPostComments(postId);
    }
  }
  render() {
    const { post, comments } = this.props;
    if (!post || !comments) {
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
        <Row className="show-grid">
          <Col xs={12}>
            <Well>
              <h3>Comments</h3>
              <ListGroup>
                {comments.map((comment) => (
                  <ListGroupItem key={comment.id} header={comment.author}>
                    {comment.body}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { post, comments } = state.PostState.selectedPost;
  return {
    post,
    comments
  };
}
export default connect(mapStateToProps, { fetchPost, fetchPostComments })(
  PostShow
);
