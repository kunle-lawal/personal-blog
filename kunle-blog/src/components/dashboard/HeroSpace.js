//Hero space will include latest post/featured posts. As well as top 3 posts. 

import React, {Component} from 'react'
import FeaturedPost from './FeaturedPost'
import {ThreeUp} from './ThreeUp'


class HeroSpace extends Component {
    render() {
        return (
            <div className="hero">
                <FeaturedPost/>
                <div className="recent_post">
                    <ThreeUp />
                </div>
            </div>
        )
    }
}

export default HeroSpace