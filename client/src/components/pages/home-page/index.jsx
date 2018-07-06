import { connect } from 'react-redux';
import { searchPostsSelector } from 'redux/selectors/filteredPosts';
import HomePage from 'components/pages/home-page/HomePage.jsx';

const mapStateToProps = (state) => ({
  posts: searchPostsSelector(state),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
