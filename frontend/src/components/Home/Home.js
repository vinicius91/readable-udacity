import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import PostCard from '../PostCard/PostCard';
import { postsPropType } from '../../models/postModel';
import { getPosts } from '../../actions';

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
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { classes, posts } = this.props;

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
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  posts: postsPropType.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    getPosts: bindActionCreators(getPosts, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    posts: state.postState.posts,
    selectedCategory: state.categoryState.selectedCategory
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home)));
