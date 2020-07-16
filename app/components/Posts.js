import React from 'react';
import { fetchMainPosts } from '../utils/api';
import Loading from './Loading';
import PostList from './PostList';

function postsReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      posts: null,
      error: null,
      loading: true,
    };
  }
  if (action.type === 'success') {
    return {
      posts: action.posts,
      error: null,
      loading: false,
    };
  }
  if (action.type === 'error') {
    return {
      posts: state.posts,
      error: action.message,
      loading: false,
    };
  }

  throw new Error('That action type is not supported.');
}

export default function Posts({ type }) {
  const [state, dispatch] = React.useReducer(postsReducer, { posts: null, error: null, loading: true });

  React.useEffect(() => {
    dispatch({ type: 'fetch' });

    fetchMainPosts(type)
      .then(posts => dispatch({ type: 'success', posts }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [type]);

  const { posts, error, loading } = state;
  console.log(posts);
  if (loading) {
    return <Loading loading={loading} />;
  }
  return <PostList posts={posts} />;
}
