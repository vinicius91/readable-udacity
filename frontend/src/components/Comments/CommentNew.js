import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  ButtonGroup,
  Glyphicon,
  HelpBlock,
  Button
} from 'react-bootstrap';
import uuid from 'uuid/v1';
import { createComment } from '../../store/actions/postActions';

class CommentNew extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: this.props.open
    };
  }

  onSubmit(values) {
    const data = {
      id: uuid(),
      parentId: this.props.postId,
      timestamp: Date.now(),
      ...values
    };
    this.props.createComment(JSON.stringify(data));
    this.props.reset();
    this.setState({ open: false });
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
    const { handleSubmit } = this.props;
    return (
      <div>
        <Panel
          id="newFormComment"
          expanded={this.props.open}
          onToggle={() => this.setState({ open: !this.state.open })}>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Panel.Body collapsible>
              <Field
                name="body"
                inputId="body"
                componentClass="textarea"
                placeholder="What your gotta say?"
                title="Body"
                component={this.renderField}
              />
              <Field
                name="author"
                inputId="author"
                type="text"
                componentClass="input"
                placeholder="Enter your Name"
                title="Author"
                component={this.renderField}
              />
              <ButtonToolbar>
                <ButtonGroup className="pull-right">
                  <Button type="submit" bsStyle="success">
                    <Glyphicon glyph="save" />
                  </Button>
                  <Button onClick={this.props.reset} bsStyle="danger">
                    <Glyphicon glyph="trash" />
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Panel.Body>
          </form>
        </Panel>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.body) {
    errors.body = 'Enter a Body!';
  }
  if (!values.author) {
    errors.author = 'Enter an Author!';
  }
  return errors;
}

export default connect(null, { createComment })(
  reduxForm({
    validate,
    form: 'CommentsNewForm'
  })(CommentNew)
);
