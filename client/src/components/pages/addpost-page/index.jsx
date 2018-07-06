import { connect } from 'react-redux';
import AddPostPage from 'components/pages/addpost-page/AddPostPage.jsx';

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default connect(mapStateToProps)(AddPostPage);