import React, { Component } from 'react'
import PostEditor from './PostEditor'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'


//DISCLAIMER ADDING ANOTHER STATE CHANGE WILL BREAK THE WAY REFRESHING THE PAGE WORKS.//
class Admin extends Component {

    render() {
        return (
            <>
                <div className="admin">
                    <PostEditor />
                </div>
            </>
        )
    }
}

export default Admin;