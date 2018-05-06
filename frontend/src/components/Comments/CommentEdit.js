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
import { editComment } from '../../store/actions/postActions';

class CommentEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
  }

  onSubmit(values) {
    const data = {
      body: values.body,
      timestamp: Date.now()
    };
    this.props.editComment(this.props.comment.id, JSON.stringify(data));
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
          id="editFormComment"
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

function mapStateToPros(state, ownProps) {
  return {
    initialValues: {
      body: ownProps.comment.body
    }
  };
}

export default connect(mapStateToPros, { editComment })(
  reduxForm({
    validate,
    form: 'CommentsEditForm'
  })(CommentEdit)
);
