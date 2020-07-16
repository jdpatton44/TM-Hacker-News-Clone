import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import PostMetaInfo from './PostMetaInfo';

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p className="text-center">This user has not posted anything yet!</p>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Title url={post.url} title={post.title} id={post.id} />
          <PostMetaInfo by={post.by} time={post.time} id={post.id} descendants={post.descendants} />
        </li>
      ))}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};
