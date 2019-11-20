import React from 'react'
// import { Link } from 'react-router-dom'

const Social = () => {
    return (
        <div className="social_container">
            <div className="social">
                <h4>Share </h4>
                <ul className="post_list">
                    <li className="social_icon facebook"><i className="fab fa-facebook"></i></li>
                    <li className="social_icon twitter"><i className="fab fa-twitter"></i></li>
                    <li className="social_icon linkedin"><i className="fab fa-linkedin"></i></li>
                    <li className="social_icon envelope"><i className="fas fa-envelope"></i></li>
                </ul>
            </div>
        </div>
    )
}

export default Social
