import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {increaseViews} from '../../../store/actions/postStateAction'
import Hero from './Hero'
import PostContent from './PostContent'
import Social from './Social'
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer'
import { Categories, Newsletter, RecentPost, AuthorFeature} from './Aside'
import { RelatedTags, RelatedPosts, AboutAuthor } from './PostTail'

class Post extends Component {
    state = {

    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.timeoutId);
    }

    render(){
       return (
           <>
            <Navbar />
                <div className="main_body_container">
                    <div className="main_body post">
                        <Hero post={this.props.post}/>
                        <div className="main_post">
                            <div className="">
                                <Social />
                                <PostContent 
                                    ownProps={this.props} 
                                    post={this.props.post}
                                />
                                <RelatedTags />
                            </div>
                            <aside className="side_bar">
                                <AuthorFeature/>
                                <RecentPost />
                                <Categories />
                                <Newsletter />
                            </aside>
                        </div>  
                        <div className="post_tail">
                            <AboutAuthor/>
                            <RelatedPosts/>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
   } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseViews: (id) => dispatch(increaseViews(id)),
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;
    return {
        post: post,
        // id: id,
        // profile: state.firebase.profile[id],
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'posts', doc: ownProps.match.params.id
        }
    ])
)(Post)