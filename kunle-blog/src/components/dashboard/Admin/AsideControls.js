import React, {Component} from 'react'

class AsideControls extends Component {
    state = {
        options: {
            tags: [

            ],
            categories: [

            ],
            public: false,
        },
        openDropdown: false,
    }

    toggleDropdown = () => {
        this.setState({
            openDropdown: !this.state.openDropdown
        })
    }
    
    handleCategories = (e) => {
        let categories = this.state.options.categories;
        if (categories.includes(e.target.id)){
            categories = categories.filter((cats) => {
                return cats !== e.target.id
            })
            document.getElementById(e.target.id).classList.remove('highlight');
            this.setState({
                options: {
                    ...this.state.options,
                    categories: categories
                }
            })
        } else {
            document.getElementById(e.target.id).classList.add('highlight');
            categories.push(e.target.id);
            this.setState({
                options: {
                    ...this.state.options,
                    categories: categories
                }
            })
        }
        this.props.snedOptions(this.state.options)
    }

    handleTags = (e) => {
        let tags = e.target.value;
        tags =  tags.split(',');
        
        this.setState({
            options: {
                ...this.state.options,
                tags: tags
            }
        })
        this.props.snedOptions(this.state.options)
    } 

    togglePrivacy = () => {
        console.log(this.state.options.public)
        this.setState({
            options: {
                ...this.state.options,
                public: !this.state.options.public
            }
        })
        this.props.snedOptions(this.state.options)
    }

    render() {
        const topics = ['Technology', 'Engineering', 'Art', 'Math', 'Misc', 'Tech News', 'Money', 'Education', 'Science', 'Steam', 'Stem', 'Jobs', 'react'];
        return (
            <>
                <div className="input-fields aside-item">
                    <div className="input-field categories">
                        <div id="dropdown" className="dropdown">
                            <h4 className="noselect" onClick={this.toggleDropdown}>Pick a Categories <i className="material-icons icon" onClick={this.toggleModuleSelect}>{this.state.openDropdown ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i></h4>
                            <div className={"dropdown_content " + (this.state.openDropdown ? 'open_dropdown_content' : '')}>
                                {topics.map((topic, id) => {
                                    return (
                                        <p id={topic} key={id} className="dropdown_item noselect" onClick={this.handleCategories}>{topic}</p>
                                    )
                                })}
                            </div>
                            <div className="display_categories">
                                {this.state.options.categories.map((cat, id) => {
                                    return (
                                        <span key={id}>{cat}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="add_tag aside-item">
                    <h4>Add Tags</h4>
                    <input type="text" className="add_tags" id="tags" onChange={this.handleTags}/>
                    <div className="display_tags">
                        {this.state.options.tags.map((tag, id) => {
                            return (
                                tag.length>1 ? <span key={id}>{tag}</span> : null
                            )
                    })}
                    </div>
                </div>

                <div className="visibility aside-item">
                    <h4 className="">Visiblity <span className={"noselect btn-flat " + (this.state.options.public ? 'public' : 'private')} onClick={this.togglePrivacy}>{this.state.options.public ? "Public" : "Private"}</span></h4>
                </div>
            </>
        )
    }
}

export default AsideControls