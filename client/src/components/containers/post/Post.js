import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ButtonLink from 'components/common/button/ButtonLink.jsx';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import { getMarkdownLayout } from 'components/helpers/markdownHelper';
import store from '../../../redux/store';

const action = ({type, payload}) => store.dispatch({type, payload});
import 'assets/styles/Article.less';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class Post extends React.Component {
  componentDidMount() {
    const {id, Description} = this.props.post;
    const {isPreviewVersion} = this.props;

    getMarkdownLayout(id, Description, isPreviewVersion);
  }

  handleDeletePost() {
    //TODO: move redirect to separate action
    action({type: 'DELETE_POST_SAGA', payload: {id: this.props.post.id}});
    this.props.history.push('/home');
  }

  renderEditButtons() {
    const {UserId, id} = this.props.post;
    const {user} = this.props;

    if (user && (user.id === UserId)) {
      return (
        <div className={bemClasses('edit-buttons')}>
          <Link to={`/addPost/:${id}`}>
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
    const {
      CreatedAt,
      UpdatedAt,
      UserId,
      isPreviewVersion,
    } = this.props.post;
    const {users} = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');
    const updatingDate = format(UpdatedAt, 'MMM D, YYYY');


    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/:${UserId}`}>
          {users[UserId]}
        </Link>
        {` / Published ${publishingDate}`}
        {!isPreviewVersion && ` / Updated ${updatingDate}`}
      </div>
    )
  }

  renderReadMoreButton() {
    const {id} = this.props.post;

    return (
      <div className={bemClasses('more-button')}>
        <ButtonLink
          linkUrl={`/post/:${id}`}
          label="Read more"
        />
      </div>
    )
  }

  renderArticleBody() {
    const {isPreviewVersion, Title, id} = this.props.post;

    return (
      <React.Fragment>
        <Link to={`/post/:${id}`}>
          <div
            className={bemClasses('main-post-image')}
            style={{backgroundImage: 'url(https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg)'}}
          />
        </Link>
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              <Link to={`/post/:${id}`}>
                {Title}
              </Link>
            </div>
            {!isPreviewVersion && this.renderEditButtons()}
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <div id={`article-${id}`} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    if (this.props.isPreviewVersion) {
      return (
        <div className="preview-article-container">
          <div>
            {this.renderArticleBody()}
          </div>
          <div className={bemClasses('post-content')}>
            {this.renderReadMoreButton()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="full-article-container">
          {this.renderArticleBody()}
        </div>
      )
    }
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isPreviewVersion: PropTypes.bool,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

Post.defaultProps = {
  UpdatedAt: new Date(),
  CreatedAt: new Date(),
  Description: 'Default description',
  Title: 'Default title',
  isPreviewVersion: true,
};

export default Post;
