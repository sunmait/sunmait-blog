import * as React from 'react';
import Post from './Post';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  users: state.profile.usersById,
  user: state.user.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
