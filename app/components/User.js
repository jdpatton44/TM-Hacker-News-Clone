import React from 'react'
import Title from './Title'
import Loading from './Loading'
import PostList from './PostList'
import queryString from 'query-string'
import { fetchUser, fetchPosts} from '../utils/api'
import { formatDate } from '../utils/helpers'

export default class User extends React.Component {
    state={
        user: null,
        loadingUser: true,
        posts: null,
        loadingPosts: true,
        error: null,
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
    
        fetchUser(id)
          .then((user) => {
            this.setState({ user, loadingUser: false})
    
            return fetchPosts(user.submitted.slice(0, 30))
          })
          .then((posts) => this.setState({
            posts,
            loadingPosts: false,
            error: null
          }))
          .catch(({ message }) => this.setState({
            error: message,
            loadingUser: false,
            loadingPosts: false
          }))
      }

    render() {
        const {user, posts, loadingPosts, loadingUser, error} = this.state 
        
        if (error) {
            return <p className='center-text error'>{error}</p>
          }

    return( 
        <React.Fragment>
            {loadingUser === true 
                ? <Loading /> 
                : <React.Fragment>
                    <h1 className="header">{user.id}</h1>
                    <div className='meta-info-light'>
                        <span>joined <b>{formatDate(user.created)}</b></span>
                        <span>has <b>{user.karma.toLocaleString()}</b> karma</span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: user.about}}></p>
                </React.Fragment>}
            {loadingPosts === true
                ? <Loading />
            : <React.Fragment>
                <h2>Posts</h2>
                <PostList posts={posts} />
            </React.Fragment>
                }
        </React.Fragment>
        
        )
    }
}