import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Edit from 'material-ui-icons/Edit';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/Article.css';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class PostPage extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  handleDeletePost() {
    this.props.deletePost(this.props.selectedPost.id);
    this.props.history.push('/home');
  }

  renderEditButtons() {
    const {user, selectedPost: {UserId, id}} = this.props;

    if (user && (user.id === UserId)) {
      return (
        <div className={bemClasses('edit-buttons')}>
          <Link to={`/addpost/${id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
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
      users,
      selectedPost: {
        CreatedAt,
        UpdatedAt,
        UserId,
      }
    } = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');
    const updatingDate = format(UpdatedAt, 'MMM D, YYYY');

    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/${UserId}`}>
          {users[UserId]}
        </Link>
        {` / Published ${publishingDate} / Updated ${updatingDate}`}
      </div>
    )
  }

  renderArticleBody() {
    const {Title, Description, ImageUrl} = this.props.selectedPost;

    return (
      <React.Fragment>
        <div
          className={bemClasses('main-post-image')}
          style={{backgroundImage: `url(${ImageUrl})`}}
        />
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              {Title}
            </div>
            {this.renderEditButtons()}
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <ReactMarkdown escapeHtml={false} source={Description} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    if (this.props.selectedPost) {
      return (
        <div className={bemClasses('container', 'full')}>
          {this.renderArticleBody()}
        </div>
      );
    } 
    return null;
  }
}
PostPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  selectedPost: PropTypes.object,
  user: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}


export default PostPage;