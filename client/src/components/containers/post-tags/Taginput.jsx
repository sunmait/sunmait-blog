import 'assets/styles/Article.css';

import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Chip from '@material-ui/core/Chip';
// import Post from '../post/Post';

const article = 'article';
const bemClasses = getBEMClasses([article]);

class Taginput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTag() {
    // const {  UserId } = this.props.posts;
    // const { users } = this.props;
    // console.log(users);

    return (
        <Chip 
          variant="outlined" 
          color="primary" 
          size="medium" 
          label='Hello, world!'
          >
        </Chip>
    );
  }

  render() {
    return (
      <div className={bemClasses('chip')}>
        {this.renderTag()}
      </div>
    );
  }
}

export default Taginput;
