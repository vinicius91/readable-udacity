import React, { Component } from 'react';
import { Container, Divider, Image, List, Segment } from 'semantic-ui-react';
import logo from '../../assets/images/logo.png';

class Footer extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical style={{ margin: '1em 0em 0em', padding: '1em 0em' }}>
          <Container textAlign="center">
            <Divider inverted section />
            <Image centered size="mini" src={logo} />
            <List horizontal inverted divided link>
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
