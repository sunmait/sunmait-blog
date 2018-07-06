import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ButtonLink from 'components/common/button/ButtonLink.jsx';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});
import 'assets/styles/Article.less';

const article = 'article';
const bemClasses = getBEMClasses([article]);

const myMarkdown = require('marked');

class Post extends React.Component {
  componentDidMount() {
    let text = myMarkdown(this.props.description);
    let multidot = '';
    if (this.props.isPreviewVersion && text.length > 350) {
      text = text.slice(0, 350);
      multidot = '...';
    }
    document.getElementById(`article-${this.props.postId}`).innerHTML = text + multidot;
  }

  handleDeletePost() {
    //TODO: move redirect to separate action
    action({type : 'DELETE_POST_SAGA', payload: {postId: this.props.postId}});
    this.props.history.push('/home');
  }

  renderEditButtons() {
    if (this.props.user && (this.props.user.id === this.props.author)) {
      return (
        <div className={bemClasses('edit-buttons')}>
          <Link to={`/addPost/:${this.props.postId}`}>
            <IconButton mini>
              <Edit />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            className="delete"
            onClick={() => this.handleDeletePost()}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }
  }

  renderArticleInformation() {
    const publishingDate = format(this.props.dateCreated, 'MMM D, YYYY');
    const updatingDate = format(this.props.dateUpdated, 'MMM D, YYYY');

    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/:${this.props.author}`}>
          {this.props.users[this.props.author]}
        </Link>
        {` / Published ${publishingDate}`}
        {!this.props.isPreviewVersion && ` / Updated ${updatingDate}`}
      </div>
    )
  }

  renderReadMoreButton() {
    return (
      <div className={bemClasses('more-button')}>
        <ButtonLink
          linkUrl={`/post/:${this.props.postId}`}
          label="Read more"
        />
      </div>
    )
  }


  render() {
    const {isPreviewVersion, title, postId} = this.props;
    
    return (
      <div className={isPreviewVersion ? "preview-article-container" : "full-article-container"}>
        <Link to={`/post/:${postId}`}>
          <div
            className={bemClasses('main-post-image')}
            style={{backgroundImage: 'url(https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg)'}}
          />
        </Link>
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              <Link to={`/post/:${postId}`}>
                {title}
              </Link>
            </div>
            {!isPreviewVersion && this.renderEditButtons()}
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <div id={`article-${postId}`} />
          </div>
          {isPreviewVersion && this.renderReadMoreButton()}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  dateCreated: PropTypes.object,
  dateUpdated: PropTypes.object,
};

Post.defaultProps = {
  dateUpdated: new Date(),
  dateCreated: new Date(),
  description: 'Default description',
  title: 'Default title',
  isPreviewVersion: true,
};

export default Post;
