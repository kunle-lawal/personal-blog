import React from 'react'
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom'

const PostList = ({posts}) => {
    return (
        <div className="main_body">
            <div className="my_post_container">
                {posts && posts.map((post, index) => {
                    return (
                        <Link to="/post/post-1" key={index}><PostSummary post={post} key={index} /></Link>
                    )
                })}
            </div>
        </div>
    )
}

export default PostList