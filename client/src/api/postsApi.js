import axios from 'axios';

/**
 *
 * @param {Number} userId
 * @param {Object} params
 * @param {Number} params.count
 * @param {Number} params.offset
 * @param {String} params.search
 */
export const getUserPosts = async (userId, params) => {
  return await axios.get(`/api/users/${userId}/posts`, {
    params,
  });
};
