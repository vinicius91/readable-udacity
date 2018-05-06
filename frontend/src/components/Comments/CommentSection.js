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
import CommentNew from './CommentNew';
import CommentEdit from './CommentEdit';

class CommentSection extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      edit: false,
      comment: null,
      open: false
    };
    this.handleNewClick = this.handleNewClick.bind(this);
  }

  renderCommentForm(edit, comment, open, postId) {
    if (!edit) {
      return <CommentNew postId={postId} open={open} />;
    } else {
      return <CommentEdit postId={postId} comment={comment} open={open} />;
    }
  }

  componentDidMount() {
    this.props.fetchPostComments(this.props.postId);
    this.setState({ open: false, edit: false, comment: null });
  }

  handleCommentVote(event, commentId, vote) {
    this.props.voteComment(commentId, JSON.stringify({ option: vote }));
  }

  handleCommentDelete(event, commentId) {
    this.props.removeComment(commentId);
  }

  handleCommentEdit(event, comment) {
    this.setState({
      comment: comment,
      edit: true,
      open: true
    });
  }

  handleNewClick() {
    if (this.state.open && this.state.edit) {
      this.setState({ edit: false, comment: null, open: true });
      return;
    } else {
      if (this.state.open) {
        this.setState({ edit: false, comment: null, open: false });
        return;
      } else {
        this.setState({ edit: false, comment: null, open: true });
        return;
      }
    }
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
    const { edit, comment, open } = this.state;
    return (
      <Row className="show-grid">
        <Col xs={12}>
          <Well>
            <Row>
              <h3>Comments</h3>
              <Button onClick={this.handleNewClick} className="pull-right">
                <Glyphicon glyph="plus" />
              </Button>
            </Row>
            {this.renderCommentForm(edit, comment, open, this.props.postId)}
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
                        <Button
                          onClick={(event) =>
                            this.handleCommentEdit(event, comment)
                          }>
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
  const { comments, open } = state.PostState.selectedPost;
  return {
    comments,
    open
  };
}

export default connect(mapStateToProps, {
  voteComment,
  removeComment,
  fetchPostComments
})(CommentSection);
