import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Well,
  PanelGroup,
  Panel,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  Badge
} from 'react-bootstrap';
import moment from 'moment';
import {
  voteComment,
  removeComment,
  fetchPostComments
} from '../../store/actions/postActions';

class CommentSection extends Component {
  componentDidMount() {
    this.props.fetchPostComments(this.props.postId);
  }

  handleCommentVote(event, commentId, vote) {
    this.props.voteComment(commentId, JSON.stringify({ option: vote }));
  }

  handleCommentDelete(event, commentId) {
    this.props.removeComment(commentId);
  }

  render() {
    const { comments } = this.props;
    if (!comments) {
      return (
        <Row className="show-grid">
          <Col xs={12}>
            <Well>
              <h3>Loading..</h3>
            </Well>
          </Col>
        </Row>
      );
    }

    return (
      <Row className="show-grid">
        <Col xs={12}>
          <Well>
            <h3>Comments</h3>
            <PanelGroup id="commentsSection">
              {comments.map((comment) => (
                <Panel key={comment.id}>
                  <Panel.Heading className="post-header">
                    <strong>Author:</strong> {comment.author}{' '}
                    <span className="pull-right">
                      {moment(comment.timestamp).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </span>
                  </Panel.Heading>
                  <Panel.Body>{comment.body}</Panel.Body>
                  <Panel.Footer>
                    <ButtonToolbar>
                      <span className="margin-right">
                        Score <Badge>{comment.voteScore}</Badge>
                      </span>
                      <ButtonGroup className="pull-right">
                        <Button
                          onClick={(event) =>
                            this.handleCommentVote(event, comment.id, 'upVote')
                          }>
                          <Glyphicon glyph="thumbs-up" />
                        </Button>
                        <Button
                          onClick={(event) =>
                            this.handleCommentVote(
                              event,
                              comment.id,
                              'downVote'
                            )
                          }>
                          <Glyphicon glyph="thumbs-down" />
                        </Button>
                        <Button>
                          <Glyphicon glyph="pencil" />
                        </Button>
                        <Button
                          onClick={(event) =>
                            this.handleCommentDelete(event, comment.id)
                          }>
                          <Glyphicon glyph="trash" />
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Panel.Footer>
                </Panel>
              ))}
            </PanelGroup>
          </Well>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  const { comments } = state.PostState.selectedPost;
  return {
    comments
  };
}

export default connect(mapStateToProps, {
  voteComment,
  removeComment,
  fetchPostComments
})(CommentSection);
