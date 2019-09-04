import React from 'react'
import { Link } from 'react-router-dom' 
import TimePosted from '../miniComponents/TimePosted'
import StoryActions from '../miniComponents/StoryActions'
import { scrollToTop } from '../miniComponents/scrollToTop'
import { connect } from 'react-redux'

const StorySummary = (props) => {
    const { story } = props;
    let reactionProps = {
        reactions: story.reactions,
        id: story.id,
        profile: ((props.profile ? props.profile.reaction : null) ? props.profile.reaction : null)
    }

    let bookmarkProps = {
        story: story,
        profile: ((props.profile) ? props.profile : null)
    }

    let trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }    

    let banned = props.profile ? props.profile.banned : false;
    return (
        <div className="my_post main_page_article">
            <div className="image_container">
                <img src="" alt=""/>
            </div>

            <div className="post_info">
                <div className="post_blurb">
                    <div className="blurb">
                        <div className="author meta">
                            <h4>By: OlaKunle Lawal</h4>
                        </div>
                        <h2>Recreational Powers</h2>
                        {/* <h4>This might be the new age.</h4> */}
                        <br/>
                        <div className="post_meta">
                            <TimePosted time={1562813777423}/>
                            <div className="metas">
                                <div className="actions meta">
                                    <div className="totalComments icon_container action">
                                        <i className="far fa-comment icon"><span>{story.commentsTotal}</span></i>
                                    </div>
                                    <div className="views icon_container noselect action">
                                        <i id="views" className="far fa-eye icon"><span id="views">{story.views}</span></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile[ownProps.story.id],
    }
}

export default connect(mapStateToProps)(StorySummary)

/*{ < div className = "totalComments" >
        <h4>{story.commentsTotal === 1 ? (story.commentsTotal + ' Comment') : (story.commentsTotal + ' Comments')}</h4>
                    </div >

    <Reactions reactions={reactionProps} /> } */