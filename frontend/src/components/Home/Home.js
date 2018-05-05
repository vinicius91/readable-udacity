import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { getAllPosts, getAllCategories } from '../../utils/api';
import PostCard from '../PostCard/PostCard';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    margin: 10
  },
  header: {
    flex: 1,
    flexGrow: 1,
    minWidth: '100%'
  },
  cardHolder: {
    flex: 1,
    flexGrow: 1,
    minWidth: '280px',
    margin: theme.spacing.unit
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      categories: []
    };
  }

  componentWillMount() {
    getAllPosts()
      .then((posts) => {
        console.log('posts', posts); // eslint-disable-line no-console
        this.setState({ posts });
      })
      .catch((err) => {
        console.log('Error', err); // eslint-disable-line no-console
      });

    getAllCategories()
      .then((categories) => {
        this.setState({ categories });
      })
      .catch((err) => {
        console.log('Error', err); // eslint-disable-line no-console
      });
  }

  render() {
    const { posts, categories } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="headline" component="h3">
            Readable Posts
          </Typography>
          <Typography component="p" className={classes.secondaryHeading}>
            Some of the best articles on the web are here!!!
          </Typography>
        </div>
        {posts.map(post => (
          <div key={post.id} className={classes.cardHolder}>
            <PostCard post={post} />
          </div>
        ))}
        {/* <div>{categories.map(category => <p>{category}</p>)}</div> */}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
