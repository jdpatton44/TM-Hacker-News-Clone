import React from 'react';
import queryString from 'query-string';
import Title from './Title';
import Loading from './Loading';
import PostList from './PostList';
import { fetchUser, fetchPosts } from '../utils/api';
import { formatDate } from '../utils/helpers';

function userReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loadingUser: true,
      loadingPosts: true,
    };
  }
  if (action.type === 'user') {
    return {
      ...state,
      user: action.user,
      loadingUser: false,
    };
  }
  if (action.type === 'posts') {
    return {
      ...state,
      posts: action.posts,
      loadingPosts: false,
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loadingUser: false,
      loadingPosts: false,
    };
  }
  throw new Error('That action type is not supported.');
}

export default function User() {
  const { id } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
    loadingUser: true,
    posts: null,
    loadingPosts: true,
    error: null,
  });

  React.useEffect(() => {
    dispatch({ type: 'fetch' });

    fetchUser(id)
      .then(user => {
        dispatch({ type: 'user', user });

        return fetchPosts(user.submitted.slice(0, 30));
      })
      .then(posts => dispatch({ type: 'posts', posts }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [id]);

  const { user, posts, loadingPosts, loadingUser, error } = state;

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingUser === true ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </React.Fragment>
      )}
      {loadingPosts === true ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h2>Posts</h2>
          <PostList posts={posts} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
