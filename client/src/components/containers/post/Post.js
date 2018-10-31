import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Button from 'components/common/button/Button.js';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Article.css';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class Post extends React.Component {
  renderArticleInformation() {
    const { CreatedAt, UserId } = this.props.post;
    const { users } = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');

    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/${UserId}`} data-cy="post-author">
          {users[UserId]}
        </Link>
        <span data-cy="post-publication-date">{` / Published ${publishingDate}`}</span>
      </div>
    );
  }

  renderReadMoreButton() {
    const { id } = this.props.post;

    return (
      <div className={bemClasses('more-button')}>
        <Button as={Link} to={`/post/${id}`}>
          Read more
        </Button>
      </div>
    );
  }

  trimDisplayingArtical(description) {
    let text = description;

    const startImageIndex = text.indexOf('<img');
    const endImageIndex = text.substr(0, startImageIndex).length + text.substr(startImageIndex).indexOf('>') + 1;

    if (text.length > 350 || startImageIndex !== -1) {
      if (startImageIndex !== -1) {
        if (startImageIndex < 350) {
          text = text.slice(0, endImageIndex);
        } else {
          text = text.slice(0, 350);
        }
      } else {
        text = text.slice(0, 350);
      }

      const closeDivTag = '</div>';
      const endTagOfString = text.substr(text.length - closeDivTag.length);
      const hasStartOfString = text.indexOf('<div');

      if (endTagOfString !== closeDivTag && hasStartOfString !== -1) {
        text += '</div><div>...</div>';
      } else {
        text += '...';
      }
    }

    return text;
  }

  renderArticleBody() {
    const { Title, Description, id, ImageUrl } = this.props.post;
    const text = this.trimDisplayingArtical(Description);

    return (
      <React.Fragment>
        <Link to={`/post/${id}`}>
          <div className={bemClasses('main-post-preview-image')} style={{ backgroundImage: `url(${ImageUrl})` }} />
        </Link>
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              <Link to={`/post/${id}`}>{Title}</Link>
            </div>
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <ReactMarkdown rawSourcePos escapeHtml={false} source={`<div>${text}</div>`} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={bemClasses('container', 'preview')}>
        <div>{this.renderArticleBody()}</div>
        <div className={bemClasses('post-content')}>{this.renderReadMoreButton()}</div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default Post;
