import React, { Component } from 'react'
import { updateReaction } from '../../store/actions/reactionAction'
import { connect } from 'react-redux'
import { showAuthModule } from '../../store/actions/authActions'

class Reactions extends Component {
    state = {
        thumb: {
            highlighted: false,
            className: 'far fa-thumbs-up icon',
        },
        firstLoad: false
    }

    componentDidMount() {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        this.setHighlight('thumb');
        this.setState({
            firstLoad: true
        })
    }

    setHighlight = (id) => {
        // const reactionType = this.props.profile[this.props.reactions.docID] ? this.props.profile[this.props.reactions.docID].reaction : undefined;
        // const liked = reactionType ? this.props.profile[this.props.reactions.docID].reaction[id] : undefined;
        const { profile } = this.props.reactions;
        if (profile === null) { return 0 }
        if (profile[id] === undefined) { return 0 }
        let className = profile[id].liked ? 'fas fa-thumbs-up icon highlighted' : 'far fa-thumbs-up icon'; //If the like does not exist set to false
        this.setState({
            [id]: {
                highlighted: profile[id].liked,
                className: className
            }
        })
    }

    toggleReaction = (e) => {
        const { auth } = this.props;
        if (!auth.uid) {
            return;
        }
        var liked = !this.state[e.target.id].highlighted;
        let className = liked ? 'fas fa-thumbs-up icon highlighted' : 'far fa-thumbs-up icon';
        this.setState({
            [e.target.id]: {
                highlighted: liked,
                className: className
            }
        })
    }

    updateLikes = (e) => {
        const { auth } = this.props;
        const { id, profile, reactions } = this.props.reactions;
        if (!auth.uid) { this.props.showAuthModule(); return; }
        // if (profile === null) { return 0 }
        // if (profile[id] === undefined) { return 0 }
        const { total } = reactions[e.target.id];
        let reactionData = {
            docID: id,
            type: [e.target.id],
            val: total,
            userData: {
                reactions: profile
            }
        }
        this.toggleReaction(e);
        this.props.updateReaction(reactionData);
    }

    render() {
        const { id, profile, reactions } = this.props.reactions;
        return (
            <div className="reaction icon_container noselect">
                <i id="thumb" className={this.state.thumb.className} onClick={this.updateLikes}> <span id="thumb">{reactions.thumb.total}</span></i>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateReaction: (reaction) => dispatch(updateReaction(reaction)),
        showAuthModule: () => dispatch(showAuthModule())
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions)