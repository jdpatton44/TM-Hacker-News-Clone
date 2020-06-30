import React from 'react'
import { fetchMainPosts } from '../utils/api'
import Loading from './Loading'
import PostList from './PostList'

export default class Posts extends React.Component {
    state = {
        posts: null,
        error: null,
        loading: true,
    }

    componentDidMount() {
        this.handleFetch()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            this.handleFetch()
        }
    }

    handleFetch() {
        this.setState(
            {
                posts: null,
                error: null,
                loading: true,
            }
        )
        fetchMainPosts(this.props.type)
        .then((posts) => this.setState({
            posts: posts,
            error: null,
            loading: false,
        }))
        .catch(({message}) => this.setState({
            posts: null,
            error: message,
            loading: false,
        }))
    }
    render () {
        const { posts, error, loading } = this.state
        console.log(this.state.posts)
        if(loading) {
            return <Loading loading={this.state.loading} />
        }
        return (
            <PostList posts={this.state.posts} />
            
        )
    }
}

