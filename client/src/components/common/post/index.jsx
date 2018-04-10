import * as React from 'react';
<<<<<<< HEAD
import Header from 'components/common/header/Header.jsx';
=======
import Header from 'components/common/header/index.jsx';
>>>>>>> 82362fe... new structure
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fbb2a31... posts info dispatched
class Post extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="article-container" key={this.props.key}>
        <div className="article">
        <Card>
          <CardContent>
<<<<<<< HEAD
            <Typography color="textSecondary">
          <div className="article-title">
            {this.props.title}
          </div>
            </Typography>
          <Typography color="textSecondary">
          <div className="article-header">
            <p>Our marks</p>
          </div>
            </Typography>
          <section className="blog-post">
            <div>
              <Typography color="textSecondary">
              <div className="paragraph">
                  {this.props.description}
              </div>
                  </Typography>
            </div>
          </section>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More...</Button>
          </CardActions>
          </Card>
        </div>
        
      </div>
    );
  }
=======
const Post = (props) => {
  return (
    <div className="article-container">
      <div className="article">
      <Card>
        <CardContent>
          <Typography color="textSecondary">
        <div className="article-title">
          {props.title}
        </div>
          </Typography>
        <Typography color="textSecondary">
        <div className="article-header">
          <p>Our marks</p>
        </div>
          </Typography>
        <section className="blog-post">
          <div>
=======
>>>>>>> fbb2a31... posts info dispatched
            <Typography color="textSecondary">
          <div className="article-title">
            {this.props.title}
          </div>
            </Typography>
          <Typography color="textSecondary">
          <div className="article-header">
            <p>Our marks</p>
          </div>
            </Typography>
          <section className="blog-post">
            <div>
              <Typography color="textSecondary">
              <div className="paragraph">
                  {this.props.description}
              </div>
                  </Typography>
            </div>
          </section>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More...</Button>
          </CardActions>
          </Card>
        </div>
        
      </div>
<<<<<<< HEAD
      
    </div>
  );
>>>>>>> 82362fe... new structure
=======
    );
  }
>>>>>>> fbb2a31... posts info dispatched
};

export default Post;