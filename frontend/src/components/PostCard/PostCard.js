import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import Comment from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 194
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  iconsWithBadge: {
    marginLeft: 15
  },
  button: {
    margin: theme.spacing.unit,
    width: 60,
    height: 60
  },
  buttonRead: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
    height: 60
  },
  comment: {
    width: 30,
    height: 30,
    margin: 5
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  }
});

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      commentOpen: false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickCommentOpennd = this.handleClickCommentOpennd.bind(this);
    this.handleCloseComment = this.handleCloseComment.bind(this);
  }
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleClickCommentOpennd() {
    this.setState({ commentOpen: true });
  }


  handleCloseComment() {
    this.setState({ commentOpen: false });
  }

  render() {
    const { classes, post } = this.props;
    const {
      title,
      author,
      category,
      voteScore,
      commentCount,
      body
    } = post;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label={author} className={classes.avatar}>
                {author.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader={category}
          />
          <CardContent>
            <Typography component="p">Author: {author}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Badge badgeContent={voteScore} color={voteScore >= 0 ? "primary" : "error"}>
              <div className={classes.iconsWithBadge}>
                <Button variant="fab" size="small" color="primary" className={classes.button}>
                  <ThumbUp />
                </Button>
                <Button variant="fab" size="small" color="secondary" className={classes.button}>
                  <ThumbDown />
                </Button>
              </div>
            </Badge>
            <Button variant="raised" size="medium" color="default" onClick={this.handleClickOpen} className={classes.buttonRead}>
              <strong>Read it!</strong>
            </Button>
            <Badge badgeContent={commentCount} color="secondary">
              <div className={classes.iconsWithBadge}>
                <Comment className={classes.comment} />
              </div>
            </Badge>
          </CardActions>
        </Card>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <Button color="inherit" variant="raised" size="medium" onClick={this.handleClickCommentOpennd}>
                Add a new Comment!
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary={title} secondary={author} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={body} />
            </ListItem>
          </List>
        </Dialog>
        <Dialog
          open={this.state.commentOpen}
          onClose={this.handleCloseComment}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new comment to {title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write here your comment
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id={title}
              type="text"
              fullWidth
              rows="4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseComment} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseComment} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
  }).isRequired
};

export default withStyles(styles)(PostCard);
