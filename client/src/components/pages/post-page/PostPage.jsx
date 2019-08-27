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
    }
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
        <Link to={`/profile/${UserId}`}>{users[UserId]}</Link>
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
        </div>
      );
    }
    return null;
  }
}
PostPage.propTypes = {
  getPost: PropTypes.func,
  selectedPost: PropTypes.object,
  user: PropTypes.object,
  users: PropTypes.object,
};

export default PostPage;
