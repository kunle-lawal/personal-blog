import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {increaseViews} from '../../../store/actions/storyStateAction'
import Hero from './Hero'
import PostContent from './PostContent'
import Social from './Social'
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
       const { story } = this.props;

       return (
            <div className="main_body_container">
                <div className="main_body post">
                    <Hero/>
                    <div className="main_post">
                        <div className="">
                            <Social />
                            <PostContent />
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
    const stories = state.firestore.data.stories;
    const story = stories ? stories[id] : null;
    return {
        story: story,
        id: id,
        profile: state.firebase.profile[id],
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((ownProps) => [
        {
            collection: 'stories', doc: ownProps.match.params.id
        }
    ])
)(Post)