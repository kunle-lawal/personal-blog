import React from 'react'
import { Link } from 'react-router-dom'

const Newsletter = () => {
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

export default Newsletter