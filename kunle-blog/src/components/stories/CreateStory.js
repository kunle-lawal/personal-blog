import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStory} from '../../store/actions/storyStateAction'
import {compose} from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import {saveData} from '../miniComponents/localstoreage'

class CreateStory extends Component {
    state = {
        title: '',
        content: '',
        topic: '',
        adding: false,
        errors: false,
        storyError: null,
        topScrolled: false,
        underReview: true,
        openDropdown: false
    }

    handleTopic = (e) => {
        this.setState({
            topic: e.target.id
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    isEmpty = () => {
        let errors = [];
        let concatErrors = (string, newString) => string + ' & ' + newString;
        if (this.state.content === '') {
            errors.push('You have to write something')
        } else if (this.state.title === '') {
            errors.push('You need a title')
        } else if (this.state.topic === '') {
            errors.push('Please pick a topic ^')
            document.getElementById('dropdown').style.color = '#ffffff';
            document.getElementById('dropdown').style.backgroundColor = '#222222';
        }
        if (errors.length === 0) { this.setState({ errors: '' }); return false } else { errors = (errors.length > 1) ? (errors.reduce(concatErrors)) : (errors[0]); };
        this.setState({
            errors: errors
        })
        return true;
    }

    checkAuth = () => {
        const { auth } = this.props;
        if (!auth.uid) {
            this.setState({
                errors: 'You need to sign in'
            })
            return false;
        }
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { storyError, Ids } = this.props;
        // if (this.checkAuth() === false) { return 0 }
        // if (this.isEmpty() === true) { return 0 }
        // if (this.state.adding || this.state.title === '' || this.state.content === '') { this.setState({ storyError: 'Make sure you have a Title and a Story'}); return 0}
        this.setState({intervalId: setInterval(this.getTimerVal.bind(this), 1000) })
        // deleteData('story');
        this.props.createStory(this.state);
        this.setState({
            adding: (storyError) ? false : true
        })
    }

    getTimerVal = () => {
        const { lastPost } = this.props.profile;
        if (this.state.timerVal >= 4) { clearInterval(this.state.intervalId); }
        this.setState({ timerVal: (((Date.now()) - lastPost) / 1000) / 60 })
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.getTimerVal.bind(this), 1000);

        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
        saveData('story', this.state);
    }

    trunc_text = (text) => {
        let maxLen = 200;
        maxLen = (text.length < maxLen) ? text.length : maxLen;

        return text.substring(0, maxLen);
    }

    toggleDropdown = () => {
        this.setState({
            openDropdown: !this.state.openDropdown
        })
    }

    render() {
        const { errors } = this.state;
        const {auth } = this.props;
        const topics = ['Science', 'Technology', 'Engineering', 'Art', 'Math', 'Misc', 'Tech News', 'Money', 'Education', 'Science', 'Steam', 'Stem', 'Jobs', 'react'];
        // if (!auth.uid) return <Redirect to='/welcome' />
        return (
            <div className="write_container container">
                <form className="write" onSubmit={this.handleSubmit}>
                    <div className="header">
                        <h3 className="dark-text test-darken-3">Tell us your story.</h3>
                    </div>
                    <div className="input-fields">
                        <div className="input-field topic">
                            <div id="dropdown" className="dropdown" onClick={this.toggleDropdown}>
                                <span>Topic - {this.state.topic}</span>
                                <div className={"dropdown_content " + (this.state.openDropdown ? '' : 'display_none')}>
                                    {topics.map((topic, id) => {
                                        return (
                                            <p id={topic} key={id} className="dropdown_item noselect" onClick={this.handleTopic}>{topic}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="input-field title">
                            <input type="text" id='title' maxLength="30" onChange={this.handleChange} value={this.state.title} placeholder="Title"/>
                        </div>

                        <div className="input-field textarea-field content">
                            <h4>Keep it civil</h4>
                            <textarea id="content" className="materialize-textarea" spellCheck="true" onChange={this.handleChange} value={this.state.content} placeholder="Write your post here"></textarea>
                        </div>

                        <div className="input-field">
                            <div className="red-text error-message center">
                                {<p>{errors}</p>}
                            </div>
                        </div>
                        <div className="button-input">
                            <button className="btn-flat white-text waves-effect waves-light">POST</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStory: (story, ids) => dispatch(createStory(story, ids))
    }
}

const mapStateToProps = (state) => {
    return {
        storyError: state.storyState.error,
        storyAdded: state.storyState.addedStory,
        Ids: state.firestore.data.Ids,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'Ids'}
    ])
)(CreateStory)