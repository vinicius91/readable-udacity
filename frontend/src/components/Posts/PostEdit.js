import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Row,
  Grid,
  Col
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { editPost, fetchPost } from '../../store/actions/postActions';

class PostEdit extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId) {
      this.props.fetchPost(postId);
    }
    console.log(this.props);
  }

  onSubmit(values) {
    const data = {
      title: values.title,
      body: values.body
    };
    this.props.editPost(
      this.props.post.id,
      JSON.stringify(data),
      this.props.history.push('/')
    );
  }

  renderField(field) {
    const {
      inputId,
      title,
      componentClass,
      type,
      placeholder,
      meta,
      input
    } = field;
    var validationState = null;
    if (meta.touched && !meta.valid) {
      validationState = 'error';
    } else if (meta.touched && meta.valid) {
      validationState = 'success';
    }
    function renderHelpBlock(validationState) {
      if (validationState === 'error') {
        return <HelpBlock>{meta.error}</HelpBlock>;
      }
      return;
    }
    return (
      <FormGroup controlId={inputId} validationState={validationState}>
        <ControlLabel>{title}</ControlLabel>
        <FormControl
          {...input}
          type={type}
          placeholder={placeholder}
          componentClass={componentClass}
        />
        {renderHelpBlock(validationState)}
      </FormGroup>
    );
  }

  render() {
    const { handleSubmit, post } = this.props;
    if (!post) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h3>Loading...</h3>{' '}
            </Col>
          </Row>
        </Grid>
      );
    }
    console.log(post);
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="title"
                inputId="title"
                type="text"
                componentClass="input"
                placeholder="Enter Title"
                title="Title"
                component={this.renderField}
              />
              <Field
                name="body"
                inputId="body"
                componentClass="textarea"
                placeholder="What your gotta say?"
                title="Body"
                component={this.renderField}
              />
              <FormGroup controlId="submit">
                <Button type="submit" bsStyle="success" bsSize="large" block>
                  Submit
                </Button>
                <LinkContainer to="/">
                  <Button bsStyle="default" bsSize="large" block>
                    Cancel
                  </Button>
                </LinkContainer>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { post } = state.PostState.selectedPost;
  if (post !== null) {
    return {
      post,
      initialValues: {
        title: post.title,
        body: post.body
      }
    };
  }
  return {
    post
  };
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a Title!';
  }
  if (!values.body) {
    errors.body = 'Enter a Body!';
  }

  return errors;
}

export default connect(mapStateToProps, { fetchPost, editPost })(
  reduxForm({
    validate,
    form: 'PostsEditForm'
  })(PostEdit)
);
