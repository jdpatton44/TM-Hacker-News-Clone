import React from 'react';
import PostMetaInfo from './PostMetaInfo';

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <PostMetaInfo comment by="comment.by" time={comment.time} id={comment.id} />
      <p dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
  );
}
