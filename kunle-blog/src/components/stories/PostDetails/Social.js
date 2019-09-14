import React from 'react'
import { Link } from 'react-router-dom'

const Social = () => {
    return (
        <div className="social_container">
            <div className="social">
                <h4>Share </h4>
                <ul className="post_list">
                    <li className="social_icon facebook"><i class="fab fa-facebook"></i></li>
                    <li className="social_icon twitter"><i class="fab fa-twitter"></i></li>
                    <li className="social_icon linkedin"><i class="fab fa-linkedin"></i></li>
                    <li className="social_icon envelope"><i class="fas fa-envelope"></i></li>
                </ul>
            </div>
        </div>
    )
}

export default Social
