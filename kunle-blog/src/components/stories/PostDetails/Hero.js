//Hero space will include latest post/featured posts. As well as top 3 posts. 

import React, { Component } from 'react'
import TimePosted from '../../miniComponents/TimePosted'

const HeroSpace = ({post}) => {
    return (
        <div className="post_hero">
            <div className="post_byline">
                <div className="post_title post_item">
                    <h1 dangerouslySetInnerHTML={{ __html: post ? post.title : ''}} />
                </div>

                <div className="post_meta post_item">
                    <div className="metas">
                        <h4>December 6th, 2019</h4>
                        <div className="actions meta">
                            <div className="totalComments icon_container action">
                                <i className="far fa-comment icon"><span>{88}</span></i>
                            </div>
                            <div className="views icon_container noselect action">
                                <i id="views" className="far fa-eye icon"><span id="views">{100}</span></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="author post_item">
                    <h4>By - Adam Lavine</h4>
                </div>
            </div>
        </div>
    )
}

export default HeroSpace