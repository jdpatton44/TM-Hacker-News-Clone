import React from 'react';
import queryString from 'query-string';
import Loading from './Loading';
import PostMetaInfo from './PostMetaInfo';
import Title from './Title';
import Comment from './Comment';
import { fetchItem, fetchComments } from '../utils/api';

function postReducer(state, action) {
  if (action.type === 'fetch') {
    return {
      ...state,
      loadingPost: true,
      loadingComments: true,
    };
  }
  if (action.type === 'post') {
    return {
      ...state,
      post: action.post,
      loadingPost: false,
    };
  }
  if (action.type === 'comment') {
    return {
      ...state,
      comments: action.comments,
      loadingComments: false,
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loadingPost: false,
      loadingComments: false,
    };
  }

  throw new Error('That action type is not supported.');
}

export default function Post() {
  const { id } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null,
  });

  const { post, loadingPost, comments, loadingComments, error } = state;

  React.useEffect(() => {
    dispatch({ type: 'fetch' });

    fetchItem(id)
      .then(post => {
        dispatch({ type: 'post', post });

        return fetchComments(post.kids || []);
      })
      .then(comments => {
        dispatch({ type: 'comment', comments });
      })
      .catch(error => {
        dispatch({ type: 'error', error });
      });
  }, [id]);

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingPost === true ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h1 className="Header">
            <Title title={post.title} url={post.url} id={post.id} />
          </h1>
          <PostMetaInfo by={post.by} time={post.time} id={post.id} descendants={post.descendants} />
        </React.Fragment>
      )}
      {loadingComments === true ? (
        <Loading />
      ) : (
        <React.Fragment>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
