import { connect } from 'react-redux';
// import { getPosts } from 'redux/modules/posts/actions';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts.posts.reverse(),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
