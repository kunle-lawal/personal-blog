import React from 'react'

const Footer = () => {
    // var location = window.location.pathname;
    return (
        <footer>
            <div className="footer_container">
                <div className="newsletter tab">
                    <div className="item">
                        <form action="" className="contact">
                            <div className="input-field">
                                <input id="email" type="email" className="validate email" onChange={"fsfs"} value={"Hello"} placeholder="Email" />
                                <button className="btn-flat">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="contact tab">
                    <div className="contact_info">
                        <h3>Contact Me</h3>
                        <p>Email: olawal196@gmail.com</p>
                    </div>
                </div>
                <div className="social tab">
                    <div className="socials">
                        <div className="social_icons">
                            <div className="social_icon"><i class="fab fa-twitter"></i></div>
                            <div className="social_icon"><i class="fab fa-linkedin"></i></div>
                            <div className="social_icon"><i class="fab fa-github"></i></div>
                        </div>
                    </div>
                </div>

                <div className="copy">
                    <h4>&copy; Chrona 2019</h4>
                </div>
            </div>
        </footer>
    )
}

export default Footer