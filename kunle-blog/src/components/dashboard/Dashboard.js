import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PostList from '../stories/PostList'
import Pagination from './Pagination'
import DashboardTemplate from './DashboardTemplate'
import HeroSpace from './HeroSpace'
import { scrollToT } from '../miniComponents/scrollToTop'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import {resetView } from '../../store/actions/navActions'


//DISCLAIMER ADDING ANOTHER STATE CHANGE WILL BREAK THE WAY REFRESHING THE PAGE WORKS.//
class Dashboard extends Component {
    state = {
        firstLoad: false,
        prevPage: 1
    }
    
    sameStoryIds = false
    // loadType = 'none'

    changePage = () => {
        this.setState({
            startAt: this.state.startAt + 1,
            endAt: this.state.endAt + 1
        })
    }

    componentDidMount() {
        // const {stories } = this.props;
        if (isNaN(this.props.match.params.id) && (this.props.match.params.id !== undefined)){return 0}
        var timeoutId = window.setTimeout(() => {
            this.setState({
                firstLoad: true,
                prevPage: Number(this.props.match.params.id)
            })
            this.loadType = 'first';
        }, 1000);
        this.setState({timeoutId: timeoutId})
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.timeoutId);
    }

    componentDidUpdate(prevProps) {
        const { stories, currentPage } = this.props;
        const prevStory = prevProps.stories ? prevProps.stories : [];
        let currPage = isNaN(currentPage) ? 1 : currentPage;
        //IF NEW PREVIOUS PAGE IS THE NEW CURRENT PAGE THEN WE ARE GOLDEN//

        if ((Number(currPage) === Number(this.state.prevPage)) || currentPage === undefined) {
            return 0;
        }
        if (prevStory.length > 0 && this.state.firstLoad) {
            if (prevProps.stories[0].id === stories[0].id) {
                this.sameStoryIds = true;

            } else {
                this.sameStoryIds = false
                this.setState({
                    prevPage: currentPage
                })
            }
        }
    }

    
    render() {
        const { nav, posts, auth } = this.props;
        // let filteredStories = (stories) ? (stories.filter((story) => {
        //     return !(this.props.banList.includes(story.userID))
        // })) : [];
        let filteredPosts = (posts) ? posts : [];
        console.log(filteredPosts);
        if (isNaN(this.props.match.params.id) && (this.props.match.params.id !== undefined)) {
            return <Redirect to='/404' />
        } else if (!nav.mobileToggled) {
            return (
                <div id="main_body_container" className="main_body_container">
                    <HeroSpace posts={filteredPosts}/>
                    <PostList posts={filteredPosts} />
                    {/* {(this.props.totalStories > 0) ? <Pagination paginateProp={paginationState}/> : null} */}
                </div>
            )
        } else {
            return (
                null
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetView: () => dispatch(resetView()),
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.firestore.ordered.posts,
        currentPage: ownProps.match.params.id,
        nav: state.nav,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        ({ collection: 'posts', orderBy: ['time', 'desc'], limit: 10})
    ])
)(Dashboard)

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect((props, dispatch) => [
//         (props.totalStories <= 0 && (props.match.url === '/' || props.match.params.id === '1')) ? { collection: 'stories', orderBy: ['postID', 'desc'], limit: props.limit } : { collection: 'stories', orderBy: ['postID', 'desc'], startAt: ((props.totalStories - (props.limit * (props.match.params.id - 1))) <= 0) ? -1 : (props.totalStories - (props.limit * (props.match.params.id - 1))) - 1, limit: props.limit }
//     ])
// )(Dashboard)

// endAt: ((props.totalStories - (props.limit * (props.match.params.id))) <= 0) ? 0 : (props.totalStories - (props.limit * (props.match.params.id))) - 1
    // (true) ? { collection: 'stories', orderBy: ['postID', 'desc'], limit: 10 } : { collection: 'stories', orderBy: ['postID', 'desc'], startAt: ((props.totalStories - (10 * (props.match.params.id - 1))), endAt: ((props.totalStories - (10 * (props.match.params.id - 1))) > 10) ? (props.totalStories - (10 * props.match.params.id)) : 0 }
// <Pagination paginationState={paginationState} />