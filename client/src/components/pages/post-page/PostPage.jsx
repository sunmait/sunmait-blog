import 'assets/styles/Article.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Tag from '../../containers/post-tags/Tag';
import Textarea from '../../common/input/Textarea';
import { CommentsListContainer } from '../../containers/commentsList';
import Button from 'components/common/button/Button.js';
import LoginModal from 'components/containers/login-modal/index.jsx';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ConfirmationModal from 'components/common/confirmation-modal/ConfirmationModal.jsx';
import TwitterShareButton from 'components/common/share-button/TwitterShareButton';
import FacebookShareButton from 'components/common/share-button/FacebookShareButton';
import { getBEMClasses } from 'helpers//BEMHelper';
import { PostPreview } from 'components/common/PostPreview/PostPreview';
import { style } from '@material-ui/system';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    if (!this.props.selectedPost && this.props.getPost) {
      this.props.getPost(postId);
      this.props.getComments(postId);
      this.props.getAveragePost(postId);
      this.props.getUserPostRating(this.props);
    }
  }

  renderTextAreaComment(warning) {
    return (
      <div className="area-container" data-cy="post-comment">
        <div className="area-content">
          <Textarea
            data-cy="post-comment"
            customClass={bemClasses('coments-textarea')}
            name="commentDescription"
            placeholder="Enter description of your comment"
          />
          <h5 customClass={bemClasses('coments-warning-message')} data-cy="comment-warning-text">
            {warning}
          </h5>
        </div>
        <div className="add-button">
          <Button
            disabled={this.props.text.length ? false : true}
            as="button"
            data-cy="add-btn-for-add-comment"
            onClick={() => {
              this.handleAddComment();
            }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }

  renderLogInModal() {
    return (
      <div className="area-container">
        <div className="area-content">
          <span>
            Please{' '}
            <Button
              as="button"
              buttonColor="primary"
              onClick={() => this.handleOpenModal()}
              data-cy="login-btn-for-add-comment"
            >
              Log In
            </Button>{' '}
            for add comment
          </span>
          <LoginModal isOpen={this.state.isModalOpen} handleClose={this.handleCloseModal} />
        </div>
      </div>
    );
  }

  handleAddComment() {
    const { length } = this.props.text;
    if (length <= 150) {
      this.props.addComment(this.props.selectedPost.id, this.props.text);
      this.props.clearFormField('commentDescription');
    }
  }

  renderCommentsList() {
    return <CommentsListContainer />;
  }

  handleOpenModal = event => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleSubmitModal = () => {
    this.props.deletePost(this.props.selectedPost.id);
    this.handleCloseModal();
  };

  renderEditButtons() {
    const {
      user,
      selectedPost: { UserId, id },
    } = this.props;

    if (user && user.id === UserId) {
      return (
        <div className={bemClasses('edit-buttons')}>
          <Link to={`/addpost/${id}`}>
            <IconButton data-cy="edit-post-button">
              <Edit />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" data-cy="delete-post-button" onClick={this.handleOpenModal}>
            <DeleteIcon />
          </IconButton>
          <ConfirmationModal
            isOpen={this.state.isModalOpen}
            handleClose={this.handleCloseModal}
            handleSubmit={this.handleSubmitModal}
            modalTitle="You want to delete this post, are you sure?"
          />
        </div>
      );
    }
  }

  handleAddLikeOrDislike = () => {
    if (this.props.user.id) {
      this.props.addLikeOrDislike(this.props.selectedPost.id, this.props.user.id, this.props.user);
    }
  };

  renderShareButtons() {
    const { Title, Likes } = this.props.selectedPost;    
    let colorLikeOrDislike = this.props.user.id
      ? (!!Likes && Likes.some(like => like.id === this.props.user.id))
        ? 'error'
        : 'disabled'
      : 'disabled';
    let text = `${Title} (posted on Sunmait Blog). `;
    return (
      <div className={bemClasses('share-buttons')}>
        <div className={bemClasses('share-button-icon')} onClick={this.handleAddLikeOrDislike} data-cy="like-button">
          <FavoriteIcon fontSize="large" color={colorLikeOrDislike} data-cy="like-color" />
          <span data-cy="like-number">{!!Likes && Likes.length ? Likes.length : null}</span>
        </div>
        <div className="ratingAuth">{this.renderAutorizedRating()}</div>
        <div className={bemClasses('share-wrapper')}>
          <div className={bemClasses('share-button-wrapper')} data-cy="twitter-share-button">
            <TwitterShareButton innerText={text} url={document.URL} />
          </div>
          <div className={bemClasses('share-button-wrapper')} data-cy="facebook-share-button">
            <FacebookShareButton innerText={text} url={document.URL} />
          </div>
        </div>
      </div>
    );
  }

  
  renderOverallRating() {
    
    return (
      <div className="overallPostRating" data-cy="overall-post-rating">
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend" />
          <Rating value={this.props.selectedPost.AverageRating} readOnly size="large" />
        </Box>
      </div>
    );
  }
  renderAutorizedRating() {
    const {
      user,
      selectedPost: { UserId, id },
    } = this.props;
    const handleSetRating = rating => {
      this.props.fetchRating(this.props.selectedPost, rating, this.props.user.id);
    };
    if (user.id) {
      return (
        <div className="userRating" data-cy="user-rating">
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend" />
            <Rating
              size="large"
              name="simple-controlled"
              onChange={(event, rating) => {
                handleSetRating(rating);
              }}
              value={this.props.selectedPost.CurentRating}
            />
          </Box>
        </div>
      );
    }
  }
  renderArticleInformation() {
    const {
      users,
      selectedPost: { CreatedAt, UpdatedAt, UserId },
    } = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');
    const updatingDate = format(UpdatedAt, 'MMM D, YYYY');
    return (
      <div className={bemClasses('info')} data-cy="post-author">
        {'By '}
        <Link to={`/profile/${UserId}`}>{users[UserId - 1][UserId]}</Link>
        <span data-cy="post-publication-date">{` / Published ${publishingDate}`}</span>
        <span data-cy="post-updating-date">{` / Updated ${updatingDate}`}</span>
      </div>
    );
  }

  renderPageMeta() {
    const { Title, ImageUrl } = this.props.selectedPost;

    return (
      <Helmet title={Title}>
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={document.URL} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={Title} />
        <meta property="og:image" content={ImageUrl} />
      </Helmet>
    );
  }
  renderTagsList() {
    const Tags = this.props.selectedPost.Tags;
    return (
      <React.Fragment>
        {Tags.map((tag, index) => (
          <Tag tag={tag.Text} key={index} />
        ))}
      </React.Fragment>
    );
  }

  renderArticleBody() {
    const { Title, Description } = this.props.selectedPost;
    return (
      <React.Fragment>
        {this.renderPageMeta()}
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')} data-cy="post-title">
              {Title}
            </div>
            <div />
            {this.renderOverallRating()}
            {this.renderEditButtons()}
          </div>
          {this.renderArticleInformation()}
          {/* {this.renderTagsList()} */}
          <PostPreview postData={Description} />
          {this.renderShareButtons()}
        </div>
      </React.Fragment>
    );
  }

  render() {
    let warningText = '';
    if (this.props.text) {
      warningText = this.props.text.length === 130 ? '20 characters remaining' : '';
      if (this.props.text.length > 150) {
        warningText = 'Number of characters exceeded 150. Enter 150 characters or less';
      }
    }
    if (this.props.selectedPost) {
      const { ImageUrl } = this.props.selectedPost;
      return (
        <div className="content-wrapper">
          <img
            className={bemClasses('main-post-page-image')}
            src={`${ImageUrl}`}
            alt="main post illustration"
            data-cy="post-image"
          />
          <div className={bemClasses('content-text-wrapper')}>
            <div className={bemClasses('content-text-wrapper__text')}>
              <div className="content">
                <div className={bemClasses('container', 'full')} data-cy="article-container">
                  {this.renderArticleBody()}
                </div>
              </div>
              <div className="comment-form">
                {this.props.user.id ? this.renderTextAreaComment(warningText) : this.renderLogInModal()}
              </div>
              <div className="comments-list-wrapper">{this.renderCommentsList()}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

PostPage.defaultProps = {
  text: '',
};

PostPage.propTypes = {
  getPost: PropTypes.func,
  selectedPost: PropTypes.object,
  comments: PropTypes.array,
  user: PropTypes.object,
  users: PropTypes.array,
};

export default PostPage;
