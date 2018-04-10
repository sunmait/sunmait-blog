import * as React from 'react';
import Header from 'components/common/header/index.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
            <Typography color="textSecondary">
            <div className="paragraph">
                {props.description}
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
};

export default Post;