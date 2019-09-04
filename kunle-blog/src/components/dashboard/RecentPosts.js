import React from 'react'
import TimePosted from '../miniComponents/TimePosted'

const postList = () => {
    return (
        <div className="my_post main_page_article">
            <div className="image_container">
                <img src="" alt="" />
            </div>

            <div className="post_info">
                <div className="post_blurb">
                    <div className="blurb">
                        <h2>How to view section C on rite</h2>
                        {/* <h4>This might be the new age.</h4> */}
                        <br />
                        <div className="post_meta">
                            <TimePosted time={1562813777423} />
                            <div className="metas">
                                <div className="actions meta">
                                    <div className="totalComments icon_container action">
                                        <i className="far fa-comment icon"><span>{100}</span></i>
                                    </div>
                                    <div className="views icon_container noselect action">
                                        <i id="views" className="far fa-eye icon"><span id="views">{1000}</span></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RecentPosts = (props) => {
    return (
        <div className="recent_post">
            {postList()}
            {postList()}
            {postList()}
        </div>
    )
}

export default RecentPosts