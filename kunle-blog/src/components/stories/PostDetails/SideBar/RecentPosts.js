import React from 'react'
import { Link } from 'react-router-dom' 

const RecentPost = () => {
    return  (
        <div className="recent_post post_sidebar">
            <h2>Recent Posts</h2>
            <ul className="post_list">
                <li>
                    <Link>
                        {/* This should be an image in the future. */}
                        <div className="img red"></div>
                        <div className="post_info">
                            <h3>How to improve the welfare affair.</h3>
                            <h4>{'by Jack man'} / {'December 24th, 2019'}</h4>
                        </div>
                    </Link>
                </li>

                <li>
                    <Link>
                        {/* This should be an image in the future. */}
                        <div className="img blue"></div>
                        <div className="post_info">
                            <h3>How to improve the welfare affair.</h3>
                            <h4>{'by Jack man'} / {'December 24th, 2019'}</h4>
                        </div>
                    </Link>
                </li>

                <li>
                    <Link>
                        {/* This should be an image in the future. */}
                        <div className="img green"></div>
                        <div className="post_info">
                            <h3>How to improve the welfare affair.</h3>
                            <h4>{'by Jack man'} / {'December 24th, 2019'}</h4>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default RecentPost