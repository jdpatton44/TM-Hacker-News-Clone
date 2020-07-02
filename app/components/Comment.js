import React from 'react'
import { render } from 'react-dom'
import { ThemeConsumer } from '../contexts/theme'
import PostMetaInfo from './PostMetaInfo'

export default function Comment ({ comment }) {
        return (
            <div className="comment">
                <PostMetaInfo
                    comment={true}
                    by={"comment.by"}
                    time={comment.time}
                    id={comment.id}
                />
                <p dangerouslySetInnerHTML={{__html: comment.text}} />
            </div>
        )
    }