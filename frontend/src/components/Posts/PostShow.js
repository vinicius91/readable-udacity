import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Row,
	Grid,
	Col,
	PageHeader,
	Well,
	Panel,
	ButtonToolbar,
	ButtonGroup,
	Button,
	Label,
	Glyphicon,
	Badge,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CommentSection from '../Comments/CommentSection';
import { fetchPost, votePost, removePost } from '../../store/actions/postActions';
import NotFound from '../Shared/NotFound';

class PostShow extends Component {
	componentDidMount() {
		const { postId } = this.props.match.params;
		if (postId) {
			this.props.fetchPost(postId);
		}
	}

	handlePostVote(event, postId, vote) {
		this.props.votePost(postId, JSON.stringify({ option: vote }));
	}

	handlePostDelete(event, postId) {
		this.props.removePost(postId);
		this.props.history.push('/');
	}

	render() {
		const { post } = this.props;
		if (!post) {
			return (
				<Grid>
					<Row className="show-grid">
						<Col xs={12}>
							<h3>Loading...</h3>
						</Col>
					</Row>
				</Grid>
			);
		} else {
			if (post.deleted === true || post.deleted === undefined) {
				return (
					<Grid>
						<Row className="show-grid">
							<Col xs={12}>
								<NotFound />
							</Col>
						</Row>
					</Grid>
				);
			} else {
				return (
					<Grid>
						<Row className="show-grid">
							<Col xs={12}>
								<PageHeader>
									{post.title}
									<br />
									<small>{post.author}</small>
								</PageHeader>
								<Well bsSize="large">
									<p>{post.body}</p>
								</Well>
								<Well>
									<ButtonToolbar>
										<span className="margin-right">
											Score <Badge>{post.voteScore}</Badge>
										</span>
										<ButtonGroup className="pull-right">
											<Button onClick={(event) => this.handlePostVote(event, post.id, 'upVote')}>
												<Glyphicon glyph="thumbs-up" />
											</Button>
											<Button
												onClick={(event) => this.handlePostVote(event, post.id, 'downVote')}
											>
												<Glyphicon glyph="thumbs-down" />
											</Button>
											<LinkContainer to={`/posts/edit/${post.id}`}>
												<Button>
													<Glyphicon glyph="pencil" />
												</Button>
											</LinkContainer>
											<Button onClick={(event) => this.handlePostDelete(event, post.id)}>
												<Glyphicon glyph="trash" />
											</Button>
										</ButtonGroup>
									</ButtonToolbar>
								</Well>
							</Col>
						</Row>
						<CommentSection postId={post.id} />
					</Grid>
				);
			}
		}
	}
}

function mapStateToProps(state, ownProps) {
	const { post } = state.PostState.selectedPost;
	return {
		post,
	};
}
export default connect(mapStateToProps, { fetchPost, votePost, removePost })(PostShow);
