import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Panel,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Label,
  Glyphicon,
  Badge
} from 'react-bootstrap';
import moment from 'moment';
import { votePost, removePost } from '../../store/actions/postActions';

class PostListItem extends Component {
  handlePostVote(event, postId, vote) {
    this.props.votePost(postId, JSON.stringify({ option: vote }));
  }

  handlePostDelete(event, postId) {
    this.props.removePost(postId);
  }

  render() {
    const {
      id,
      title,
      author,
      category,
      commentCount,
      timestamp,
      voteScore
    } = this.props.post;

    return (
      <Panel key={id}>
        <Panel.Heading className="post-header">
          <Panel.Title componentClass="h1">{title}</Panel.Title>
          <hr />
          <Panel.Title>
            <small>
              Writen By <strong>{author}</strong> at
              <span>
                {' '}
                {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}
              </span>
            </small>
            <Label className="pull-right">{category}</Label>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Footer>
          <ButtonToolbar>
            <span className="margin-right">
              Score <Badge>{voteScore}</Badge>
            </span>
            <span>
              Comments <Badge>{commentCount}</Badge>
            </span>
            <ButtonGroup className="pull-right">
              <Button
                onClick={(event) => this.handlePostVote(event, id, 'upVote')}>
                <Glyphicon glyph="thumbs-up" />
              </Button>
              <Button
                onClick={(event) => this.handlePostVote(event, id, 'downVote')}>
                <Glyphicon glyph="thumbs-down" />
              </Button>
              <LinkContainer to={`/${category}/${id}`}>
                <Button>
                  <Glyphicon glyph="eye-open" />
                </Button>
              </LinkContainer>
              <LinkContainer to={`/posts/edit/${id}`}>
                <Button>
                  <Glyphicon glyph="pencil" />
                </Button>
              </LinkContainer>
              <Button onClick={(event) => this.handlePostDelete(event, id)}>
                <Glyphicon glyph="trash" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Panel.Footer>
      </Panel>
    );
  }
}

export default connect(null, { votePost, removePost })(PostListItem);
