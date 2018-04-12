import * as React from 'react';
import '../../../assets/styles/AddPostPage.less';
import Header from 'components/common/header/index.jsx';
import Footer from 'components/common/footer/index.jsx';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class AddPostPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddPost(title, description) {
    console.log(title);
    console.log(description);
    this.props.addPost(title, description);
  }

  render() {
    return (
      <div className="main">
        <Header
          auth={this.state.auth}
        />
        <div className="content">
          <div className="AddPage">
            <h2 className="desc">
              Title:
            </h2>
            <TextField
              margin="normal"
              name="title"
              className="field"
              onChange={this.handleInputChange}
            />
            <h2 className="desc">
              Description:
            </h2>
            <TextField
              multiline
              rows="30"
              margin="normal"
              name="description"
              className="field"
              onChange={this.handleInputChange}
            />
            <div className="button">
              <Button
                variant="raised"
                color="primary"
                onClick={() => this.handleAddPost(this.state.title, this.state.description)}
              >
                Public article
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddPostPage;