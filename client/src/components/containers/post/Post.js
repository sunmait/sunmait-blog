import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Button from 'components/common/button/Button.js'
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/Article.css';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class Post extends React.Component {
  renderArticleInformation() {
    const {CreatedAt, UserId} = this.props.post;
    const {users} = this.props;

    const publishingDate = format(CreatedAt, 'MMM D, YYYY');

    return (
      <div className={bemClasses('info')}>
        {'By '}
        <Link to={`/profile/${UserId}`}>
          {users[UserId]}
        </Link>
        {` / Published ${publishingDate}`}
      </div>
    )
  }

  renderReadMoreButton() {
    const {id} = this.props.post;

    return (
      <div className={bemClasses('more-button')}>
        <Button
          as={Link}
          to={`/post/${id}`}
        >
          Read more
        </Button>
      </div>
    )
  }

  renderArticleBody() {
    const {Title, Description, id, ImageUrl} = this.props.post;
    let text = Description;

    if (text.length > 350) {
      text = text.slice(0, 350);
      text += '...';
    }

    return (
      <React.Fragment>
        <Link to={`/post/${id}`}>
          <div
            className={bemClasses('main-post-image')}
            style={{backgroundImage: `url(${ImageUrl})`}}
          />
        </Link>
        <div className={bemClasses('post-content')}>
          <div className={bemClasses('header')}>
            <div className={bemClasses('title')}>
              <Link to={`/post/${id}`}>
                {Title}
              </Link>
            </div>
          </div>
          {this.renderArticleInformation()}
          <div className={bemClasses('description')}>
            <ReactMarkdown skipHtml={true} source={text} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className={bemClasses('container', 'preview')}>
        <div>
          {this.renderArticleBody()}
        </div>
        <div className={bemClasses('post-content')}>
          {this.renderReadMoreButton()}
        </div>
      </div>
    ) 
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default Post;
