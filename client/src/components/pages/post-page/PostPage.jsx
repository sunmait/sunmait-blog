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

import ConfirmationModal from 'components/common/confirmation-modal/ConfirmationModal.jsx';
import TwitterShareButton from 'components/common/share-button/TwitterShareButton';
import FacebookShareButton from 'components/common/share-button/FacebookShareButton';
import { getBEMClasses } from 'helpers//BEMHelper';
import { PostPreview } from 'components/common/PostPreview/PostPreview';

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
    if (!this.props.selectedPost && this.props.getPost) {
      this.props.getPost(this.props.match.params.postId);
      this.props.getComments(this.props.match.params.postId);
    }
  }

  renderTextAreaComment(warning) {
    return (
      <div className="area-container">
        <div className="area-content">
          <Textarea customClass="textarea" name="commentDescription" placeholder="Enter description of your comment" />
          <h5 style={{ color: 'red', fontSize: '12px', margin: '0' }} data-cy="comment-warning-text">
            {warning}
          </h5>
        </div>
        <div className="add-button">
          <Button
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

  renderShareButtons() {
    const { Title } = this.props.selectedPost;

    let text = `${Title} (posted on Sunmait Blog). `;
    return (
      <div className={bemClasses('share-buttons')}>
        <div className={bemClasses('share-button-wrapper')} data-cy="twitter-share-button">
          <TwitterShareButton innerText={text} url={document.URL} />
        </div>
        <div className={bemClasses('share-button-wrapper')} data-cy="facebook-share-button">
          <FacebookShareButton innerText={text} url={document.URL} />
        </div>
      </div>
    );
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
        {Tags.map(tag => (
          <Tag tag={tag.Text} key={tag.id} />
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
          <div className="content">
            <div className={bemClasses('container', 'full')} data-cy="article-container">
              {this.renderArticleBody()}
            </div>
          </div>
          <div className="comment-form">
            {this.props.user.id ? this.renderTextAreaComment(warningText) : this.renderLogInModal()}
          </div>
          {this.renderCommentsList()}
        </div>
      );
    }
    return null;
  }
}
PostPage.propTypes = {
  getPost: PropTypes.func,
  selectedPost: PropTypes.object,
  comments: PropTypes.array,
  user: PropTypes.object,
  users: PropTypes.array,
};

export default PostPage;
