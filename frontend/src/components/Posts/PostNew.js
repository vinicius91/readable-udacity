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
import uuid from 'uuid/v1';
import { createPost } from '../../store/actions/postActions';
import { fetchCategories } from '../../store/actions/categoriesActions';

class PostNew extends Component {
  onSubmit(values) {
    const data = {
      id: uuid(),
      timestamp: Date.now(),
      ...values
    };
    this.props.createPost(JSON.stringify(data), this.props.history.push('/'));
  }

  renderSelect(categories) {
    if (!categories) {
      return;
    }
    return (
      <Field
        name="category"
        component={(field) => {
          const { meta, input } = field;
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
            <FormGroup controlId="category" validationState={validationState}>
              <ControlLabel>Category</ControlLabel>
              <FormControl
                {...input}
                componentClass="select"
                placeholder="Category">
                {categories.map((category) => (
                  <option value={category.path} key={category.path}>
                    {category.name}
                  </option>
                ))}
              </FormControl>
              {renderHelpBlock(validationState)}
            </FormGroup>
          );
        }}
      />
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
    const { handleSubmit, categories } = this.props;
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
              {this.renderSelect(categories)}
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

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a Title!';
  }
  if (!values.category) {
    errors.category = 'Enter a Category!';
  }
  if (!values.body) {
    errors.body = 'Enter a Body!';
  }
  if (!values.author) {
    errors.author = 'Enter an Author!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    categories: state.CategoryState.categories
  };
}

export default connect(mapStateToProps, { createPost, fetchCategories })(
  reduxForm({
    validate,
    form: 'PostsNewForm'
  })(PostNew)
);
