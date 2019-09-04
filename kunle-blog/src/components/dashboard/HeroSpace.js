//Hero space will include latest post/featured posts. As well as top 3 posts. 

import React, {Component} from 'react'
import FeaturedPost from './FeaturedPost'
import RecentPosts from './RecentPosts'


class HeroSpace extends Component {
    render() {
        return (
            <div className="hero">
                <FeaturedPost/>
                <RecentPosts/>
            </div>
        )
    }
}

export default HeroSpace