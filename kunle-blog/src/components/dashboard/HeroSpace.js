//Hero space will include latest post/featured posts. As well as top 3 posts. 

import React, {Component} from 'react'
import FeaturedPost from './FeaturedPost'
import {ThreeUp} from './ThreeUp'
import { Link } from 'react-router-dom'


class HeroSpace extends Component {
    render() {
        return (
            <div className="hero">
                <FeaturedPost/>
                <div className="recent_post">
                    <Link to="/post/NpcRaVOb0zzpJotChOp0"><ThreeUp /></Link>
                </div>
            </div>
        )
    }
}

export default HeroSpace