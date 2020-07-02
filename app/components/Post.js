import React from 'react'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'
import queryString from 'query-string'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'

export default class Post extends React.Component {
    state = {
        post: null,
        loadingPost: true,
        comments: null,
        loadingComments: true,
        error: null,
    }
    
    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)

        fetchItem(id)
        .then((post) => {
            this.setState( { post: post, loadingPost: false })

            return fetchComments(post.kids || [])
        })
        .then((comments) => this.setState({ 
            comments: comments, 
            loadingComments: false
        }))
        .catch(( {message} ) => this.setState({
            error: message, 
            loadingPost: false, 
            loadingComments: false
        }))
    }
    
    render() {
        const { post, loadingPost, comments, loadingComments, error } = this.state
        
        if (error) {
            return <p className='center-text error'>{error}</p>
          }

        return (
            <React.Fragment>
                {loadingPost === true ? <Loading /> 
                : <React.Fragment>
                    <h1 className="Header">
                        <Title title={post.title} url={post.url} id={post.id} />
                    </h1>
                    <PostMetaInfo by={post.by} time={post.time} id={post.id} descendants={post.descendants} />
                </React.Fragment>
                }
                {loadingComments === true ? <Loading /> 
                : <React.Fragment>
                    {this.state.comments.map((comment) =>
                    <Comment
                        key={comment.id}
                        comment={comment}
                    />
                    )}
              </React.Fragment>}    
            </React.Fragment>

            
        ) 
    }
}