import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Taginput from '../post-tags/Taginput.jsx';
import Button from 'components/common/button/Button.js';

// import Paper from '@material-ui/core/Paper';
// import InputLabel from '@material-ui/core/InputLabel';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import TextField from '@material-ui/core/TextField';
// import Chip from '@material-ui/core/Chip';
// import FormControl from '@material-ui/core/FormControl';

import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Article.css';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class Post extends React.Component {
  renderArticleInformation() {
    const { CreatedAt, UserId } = this.props.post;
    const { users } = this.props;

    console.table(users);
    console.table(this.props.post);

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

  // renderTag() {
  //   const { Tags } = this.props.post;

  //   return (
  //     <div className={bemClasses('chip')}>
  //       <Chip 
  //         variant="outlined" 
  //         color="primary" 
  //         size="medium" 
  //         label={Tags[0].Text}>
  //       </Chip>
  //     </div>
  //   );
  // }

  renderArticleBody() {
    const { Title, Description, id, ImageUrl } = this.props.post;
    let text = Description;

    if (text.length > 350) {
      text = text.slice(0, 350);
      text += '...';
    }

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
            <ReactMarkdown skipHtml={true} source={text} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={bemClasses('container', 'preview')}>
        <div>{this.renderArticleBody()}</div>
        <div className={bemClasses('post-content')}>
          {this.renderReadMoreButton()}
          {/* {this.renderTag()} */}
        <div>
          <Taginput />
        </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  users: PropTypes.object,
};

export default Post;
