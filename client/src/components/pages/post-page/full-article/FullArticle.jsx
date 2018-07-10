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

class FullArticle extends React.Component {
  handleDeletePost() {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/home');
  }

  renderEditButtons() {
    const {user, post: {UserId, id}} = this.props;

    if (user && (user.id === UserId)) {
      return (
        <div className={bemClasses('edit-buttons')}>
          <Link to={`/addPost/${id}`}>
            <IconButton mini>
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
      post: {
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
    const {Title, Description, id} = this.props.post;

    return (
      <React.Fragment>
        <Link to={`/post/${id}`}>
          <div
            className={bemClasses('main-post-image')}
            style={{backgroundImage: 'url(https://www.digitalimpact.co.uk/wp-content/uploads/2015/11/TechStockHeader.jpg)'}}
          />
        </Link>
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              <Link to={`/post/${id}`}>
                {Title}
              </Link>
            </div>
            {this.renderEditButtons()}
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <ReactMarkdown source={Description} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className={bemClasses('container', 'full')}>
        {this.renderArticleBody()}
      </div>
    );
  }
}

FullArticle.propTypes = {
  post: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default FullArticle;
