import * as React from 'react';
import Header from 'components/common/header/index.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class Post extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const createdDate = this.props.dateCreated.substring(0, 4) + " " +
    this.props.dateCreated.substring(5, 7) + " " +
    this.props.dateCreated.substring(8, 10) + " " +
    this.props.dateCreated.substring(11, 19);

    const updatedDate = this.props.dateUpdated.substring(0, 4) + " " +
    this.props.dateUpdated.substring(5, 7) + " " +
    this.props.dateUpdated.substring(8, 10) + " " +
    this.props.dateUpdated.substring(11, 19);

    return (
      <div className="article-container" key={this.props.key}>
        <div className="article">
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                <div className="article-title">
                  <Link to="/post">
                    {this.props.title}
                  </Link>
                </div>
                  {
                    this.props.edit ?
                      <Link to="/addpost">
                        <div className="edit" />
                      </Link>
                    :
                    <div className="article-author">
                      <p>
                        Author:
                        <Link to="/profile">
                          {this.props.author}
                        </Link>
                      </p>
                    </div>
                  }
              </Typography>
              <Typography color="textSecondary">
                <div className="article-header">
                  <p>
                    Our marks
                  </p>
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
            <CardActions className="more-button">
              <Link to="/post">
                <Button size="small">
                  Learn More...
                </Button>
              </Link>
            </CardActions>
            <div className="article-dates">
              <div className="article-date">
                Created: {createdDate}
              </div>
              <div className="article-date">
                Last updated: {updatedDate}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
};

Post.defaultProps = {
  dateUpdated: 'none',
  dateCreated: 'none',
  description: 'Default description',
  author: 'none',
  title: 'Default title',
  // edit: false
};

export default Post;