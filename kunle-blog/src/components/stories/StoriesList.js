import React from 'react'
import StorySummary from './StorySummary';

const StoryList = ({stories}) => {
    return (
        <div className="main_body">
            <div className="my_post_container">
                {stories && stories.map(story => {
                    return (
                        <StorySummary story={story} key={story.id} />
                    )
                })}
            </div>
        </div>
    )
}

export default StoryList