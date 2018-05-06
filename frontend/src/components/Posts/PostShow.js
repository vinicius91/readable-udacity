import React, { Component } from 'react';
import {
  Row,
  Grid,
  Col,
  PageHeader,
  Well,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

class PostShow extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <PageHeader>
              Post Title <small>Post Author</small>
            </PageHeader>
            <Well bsSize="large">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                id aliquam libero. Suspendisse egestas fermentum dolor eget
                pulvinar. Nunc nec nunc sit amet tellus ornare ultrices.
                Pellentesque tincidunt est imperdiet, auctor magna a, porttitor
                mauris. Nullam eu ex in turpis lacinia pharetra. Quisque nec
                lorem maximus, eleifend arcu at, elementum sapien. Duis mollis
                purus a quam scelerisque dignissim. Etiam tristique accumsan
                volutpat. Mauris convallis velit justo, ac aliquet nisi
                efficitur quis. Pellentesque elementum magna non dignissim
                hendrerit. Curabitur semper purus ut justo eleifend blandit. Ut
                pellentesque, lectus ut volutpat volutpat, ligula eros gravida
                est, non dictum nibh sem sed massa. Suspendisse justo felis,
                porttitor eget nisl sit amet, aliquam ullamcorper nisi.
              </p>
            </Well>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12}>
            <Well>
              <h3>Comments</h3>
              <ListGroup>
                <ListGroupItem header="Comment Author">
                  Pellentesque quis lectus sit amet odio bibendum fringilla. Sed
                  at suscipit nisl, nec hendrerit velit. In sed tempor justo.
                  Nullam cursus, magna vitae aliquet ultrices, quam ex molestie
                  leo, vitae pharetra elit leo et ex. Ut sed ligula ante. Aenean
                  a erat sit amet ante efficitur tempor et sed turpis. Donec
                  semper leo sit amet hendrerit ultrices.
                </ListGroupItem>
                <ListGroupItem header="Comment Author">
                  Pellentesque quis lectus sit amet odio bibendum fringilla. Sed
                  at suscipit nisl, nec hendrerit velit. In sed tempor justo.
                  Nullam cursus, magna vitae aliquet ultrices, quam ex molestie
                  leo, vitae pharetra elit leo et ex. Ut sed ligula ante. Aenean
                  a erat sit amet ante efficitur tempor et sed turpis. Donec
                  semper leo sit amet hendrerit ultrices.
                </ListGroupItem>
                <ListGroupItem header="Comment Author">
                  Pellentesque quis lectus sit amet odio bibendum fringilla. Sed
                  at suscipit nisl, nec hendrerit velit. In sed tempor justo.
                  Nullam cursus, magna vitae aliquet ultrices, quam ex molestie
                  leo, vitae pharetra elit leo et ex. Ut sed ligula ante. Aenean
                  a erat sit amet ante efficitur tempor et sed turpis. Donec
                  semper leo sit amet hendrerit ultrices.
                </ListGroupItem>
                <ListGroupItem header="Comment Author">
                  Pellentesque quis lectus sit amet odio bibendum fringilla. Sed
                  at suscipit nisl, nec hendrerit velit. In sed tempor justo.
                  Nullam cursus, magna vitae aliquet ultrices, quam ex molestie
                  leo, vitae pharetra elit leo et ex. Ut sed ligula ante. Aenean
                  a erat sit amet ante efficitur tempor et sed turpis. Donec
                  semper leo sit amet hendrerit ultrices.
                </ListGroupItem>
              </ListGroup>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PostShow;
