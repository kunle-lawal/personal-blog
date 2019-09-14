import React from 'react'
import { Link } from 'react-router-dom'

export const AuthorFeature = () => {
    return (
        <div className="post_sidebar author_feature">
            <div className="tab">
                <h3>About Author</h3>
                <br />
                <div className="img"></div>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi, sapiente eaque. Voluptatum, accusantium quo.
                    A repellendus debitis placeat voluptate ducimus error!</p>
            </div>
        </div>
    )
}

export const Categories = () => {
    return (
        <div className="post_sidebar categories">
            <h2>Categories </h2>
            <ul className="post_list">
                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>

                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>

                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>

                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>

                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>

                <li>
                    <Link>
                        <h4>Culture</h4>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export const Newsletter = () => {
    return (
        <div className="post_sidebar newsletter_container">
            <h2>Newsletter SignUp</h2>
            <div className="newsletter tab">
                <div className="item">
                    <form action="" className="contact">
                        <div className="input-field">
                            <input id="email" type="email" className="validate email" onChange={"fsfs"} value={"Hello@yahoo.com"} placeholder="Email" />
                            <button className="btn-flat">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const RecentPost = () => {
    return (
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