import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { toggleMobileNav, resetView, openFullNav, closeFullNav, toggleFullNav } from '../../store/actions/navActions'

const Navbar = (props) => {
    const {auth, nav, Ids, profileData} = props; 
    const mobile_nav = nav.mobileToggled ? 'mobile_nav' : 'mobile_nav-noDisplay';
    const toggle_mobile_nav = nav.mobileToggled ? 'animate' : '' 
    return (
        // Nav Container.
        <nav className="nav">
            <div className="top_section">
                <div className="top_section_items">
                    <div className="logo_container left">
                        <div className="logo">
                            <Link to='/'><h2>TITLE</h2></Link>
                        </div>
                    </div>
                    <div className="top_section_item right connect">
                        <div className="socials">
                            <div className="social_icons">
                                <div className="social_icon"><i className="fab fa-twitter"></i></div>
                                <div className="social_icon"><i className="fab fa-linkedin"></i></div>
                                <div className="social_icon"><i className="fab fa-github"></i></div>
                                <div className="social_icon"><i className="far fa-envelope"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileNav: () => dispatch(toggleMobileNav()),
        resetView: () => dispatch(resetView()),
        openFullNav: () => dispatch(openFullNav()),
        closeFullNav: () => dispatch(closeFullNav()),
        toggleFullNav: () => dispatch(toggleFullNav()),
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        nav: state.nav,
        Ids: state.firestore.data.Ids,
        data: state.firestore.data,
        profileData: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'Ids' }
    ])
)(Navbar)