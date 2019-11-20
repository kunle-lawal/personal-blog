import React from 'react'
import { TwoUp } from '../../dashboard/ThreeUp'

export const AboutAuthor = () => {
    return (
        <div className="post_sidebar about_author">
            <div className="tab">
                <div className="img"></div>
                <div className="author_info">
                    <h3>Guest Author</h3>
                    <h4>Jack Pane</h4>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi, sapiente eaque. Voluptatum, accusantium quo.
                    A repellendus debitis placeat voluptate ducimus error!</p>
                </div>
            </div>
        </div>
    )
}

export const RelatedTags = () => {
    return (
        <div className="related_tags">
            <a href="/">Tech</a>
            <a href="/">Tec</a>
            <a href="/">Economist</a>
            <a href="/">Tech</a>
            <a href="/">Plantations</a>
            <a href="/">React</a>
        </div>
    )
}

export const RelatedPosts = () => {
    return (
        <div className="related_posts">
            <h3>Realted Post</h3>
            <TwoUp/>
        </div>
    )
}