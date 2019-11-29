import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import AsideControls from './AsideControls'
import { createPost } from '../../../store/actions/postStateAction'
import { uploadImage } from '../../../store/actions/uploadActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';



//DISCLAIMER ADDING ANOTHER STATE CHANGE WILL BREAK THE WAY REFRESHING THE PAGE WORKS.//
class PostEditor extends Component {

    state = {
        theme: 'snow',
        value: 'Start Typing...',
        moduleIsOpen: false,
        changesSaved: false,
        currentId:0 ,
        allContent: [],
        editors: [],
        editorContents: [],
        modules: [],
        post: {
           title: '',
           content: '',
           options: {

           },
           totalPosts: this.props.totalPosts ? this.props.totalPosts[0].totalPosts : 0,
        },
         
    }

    formats = {
        header: [
            'header',
            'link', 'align',
            'clean'
        ],

        paragraph: [
            'bold', 'italic', 'underline', 'strike', 'link',
            'list', 'bullet',
            'indent',
            'link', 'align', 
            'color', 'background',
            'clean'
        ], 

        quote: [
            'blockquote'
        ], 
        
        image: [
            'image'
        ],

        code: [
            'code'
        ]
    };

    modules = {
        header: {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['link', { 'align': [] }],
                ['clean']
            ]
        },
        paragraph: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike', 'link'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '+1' }, { 'indent': '-1' }],
                ['link', {'align': []}],
                [{'color': []}, {'background': []}],
                ['clean']
            ]
        },

        quote: {
            toolbar: [
                ['blockquote'],
                ['link', { 'align': [] }],
                ['clean']
            ]
        },

        image: {
            toolbar: [
                ['image']
            ]
        },

        code: {
            toolbar: [
                ['code']
            ]
        },
    }

    toggleModuleSelect = (e) => {
        this.setState({
            moduleToOpen: (e ? e.target : false) ? e.target.id : this.state.moduleToOpen,
            moduleIsOpen: !this.state.moduleIsOpen
        })
    }

    savePost = () => {
        if(this.state.changesSaved) {return 0;}
        let title = document.querySelector('#title').children[0].children[1].children[0].innerHTML;
        let content = '';
        for(var i = 0; i < this.state.editors.length; i++) {
            content += this.state.editors[i] !== '' ? document.querySelector('#'+this.state.editors[i]).children[1].children[1].children[0].innerHTML : ''
        }

        console.log(content);

        this.setState({
            changesSaved: true,
            post: {
                ...this.state.post,
                title: title,
                content: content,
                totalPosts: this.props.totalPosts[0].totalPosts
            }
        })
    }

    submitPost = () => {
        this.savePost();

        this.props.createPost(this.state.post);
        console.log('Posted');
    }

    addModule = (moduleToAdd) => {
        if(moduleToAdd === 'line') {
            let line = <hr className="line"/>
            this.setState({
                changesSaved: false,
                editors: [
                    ...this.state.editors,
                    moduleToAdd + '' + this.state.editors.length
                ],
                modules: [
                    ...this.state.modules,
                    [line, 'line']
                ]
            })

            return;
        }
        let placeholder = "Add " + moduleToAdd;
        const id = this.state.modules.length.toString();
        var module = [
            <ReactQuill
                theme={this.state.theme}
                modules={this.modules[moduleToAdd]}
                placeholder={placeholder}
                formats={this.formats.moduleToAdd}
                onChange={this.trackContent}
                onKeyPress={this.trackId}
                onBlur={this.unTrackId}
                id={id}
            />, 
            moduleToAdd
        ]
                    

        this.setState({
            changesSaved: false,
            editors: [
                ...this.state.editors,
                moduleToAdd + '' + this.state.editors.length
            ],
            modules: [
                ...this.state.modules,
                module
            ]
        })

        this.toggleModuleSelect();
    }

    deleteModule = (e) => {
        let modules = this.state.modules;
        let editors = this.state.editors;
        let allContent = this.state.allContent;
        
        let id = Number(e.target.id)

        modules.splice(id, 1, '')
        editors.splice(id, 1, '')
        allContent.splice(id, 1, '')

        // let filtered_modules = modules.filter((value, index) => {
        //     // console.log(index, id);
        //     return index !== id;
        // })
        
        // let filtered_editors = editors.filter((value, index) => {
        //     // console.log(index, id);
        //     return index !== id
        // })
        
        var elem = document.querySelector("#\\3"+e.target.id);
        console.log(elem)
        elem.parentElement.parentNode.removeChild(elem.parentElement);
        this.setState({
            editors: editors,
            modules: modules,
            allContent: allContent
        })
        // document.querySelector("#\\31 2wow")
        // console.log(this.state.editors)
    }

    changesMade = () => {
        this.setState({
            changesSaved: false
        })
    }

    trackId = (e) => {
        const currentId = Number(e.target.parentElement.parentElement.id);
        console.log(e.target.id);
        this.setState({
            currentId: currentId,
            makingChanges: true,
            changesSaved: false
        })
    }

    unTrackId = () => {
        this.setState({
            makingChanges: false,
        })
    }

    trackContent = (content, delta, source, editor) => {
        if(!this.state.makingChanges){return false}
        let modules = this.state.modules
        let allContent = this.state.allContent
        // console.log(modules);
        let thisModule = modules[this.state.currentId][0];
        let moduleToAdd = modules[this.state.currentId][1];
        let placeholder = "Add " + moduleToAdd;
        let newModule = [
            <ReactQuill
                theme={this.state.theme}
                modules={this.modules[moduleToAdd]}
                placeholder={placeholder}
                formats={this.formats.moduleToAdd}
                onChange={this.trackContent}
                onKeyPress={this.trackId}
                onBlur={this.unTrackId}
                value={editor.getHTML()}
                id={thisModule.props.id}
            />,
            moduleToAdd
        ]
        
        modules.splice(this.state.currentId, 1, newModule)
        allContent.splice(this.state.currentId, 1, editor.getHTML())
        // console.log(modules);
        this.setState({
            allContent: allContent,
            modules: modules,
            changesSaved: false
        })
    }

    uploadImage = (url) => {
        console.log('upload');
    }

    getAsideOptions = (options) => {
        this.setState({
            post: {
                ...this.state.post,
                options: options
            }
        })
    }

    render() {
        let modules = this.state.modules;
        return (
            <>
            <div className='top_rack'>
                <AddModule 
                    state={this.state}
                    toggleModuleSelect={this.toggleModuleSelect}
                    addModule={this.addModule}
                    placement={'toprack'}
                />

                <div className="save_submit">
                    <div className={'save_changes btn-flat waves-effect' + (this.state.changesSaved ? ' changes_saved' : '')} onClick={this.savePost}>{this.state.changesSaved ? 'Changes Saved' : 'Save Changes'}</div>
                    <div className={"submit_changes btn-flat waves-effect " + (this.state.changesSaved ? "" : "display_none")} onClick={this.submitPost}>Publish</div>
                </div>

                <div className="delete_post aside-item btn-flat noselect">
                    Delete Post
                </div>
            </div>
            <div className="content_control">
                <div id="postEditor" className="postEditor">
                <div className="module_block title header" id="title">
                    <ReactQuill
                        theme={this.state.theme}
                        placeholder={'Add Title'}
                        modules={this.modules['header']}
                        onKeyPress={this.changesMade}
                        onBlur={this.unTrackId}
                    />
                </div>
                {modules.length > 0 && modules.map((module, index) => {
                    return (
                       <div className={"module_block " + module[1]} key={index} id={module[1] + '' + index}>
                            <i id={index} className="far fa-trash-alt remove_module" onClick={this.deleteModule}></i>
                            {module[0]}
                       </div>
                    )
                })}
            <AddModule 
                state={this.state}
                toggleModuleSelect={this.toggleModuleSelect}
                addModule={this.addModule}
                placement={'content'}
            />
            </div>
            <aside>
                <AsideControls
                    snedOptions={this.getAsideOptions}
                />
            </aside>
            </div>
            </>
        )
    }
}

var AddModule = (props) => {
    return(
        <div className={"addModule_container _" + props.placement}>
            <div className={" add_module " + props.placement}>
                <i id={props.placement} className="material-icons icon" onClick={props.toggleModuleSelect}>{props.state.moduleIsOpen ? 'close' : 'add'}</i>
            </div>
            <div className={"block_select_container " + (props.state.moduleIsOpen ? "open_blocks_select_" : "") + props.state.moduleToOpen}>
                <div className="blocks_select">
                    <div className="block_type" onClick={() => { props.addModule("paragraph") }}>
                        <i className="fas fa-paragraph"></i>
                        <p>Paragraph</p>
                    </div>

                    <div className="block_type" onClick={() => { props.addModule("header") }}>
                        <span>T</span>
                        <p>Heading</p>
                    </div>

                    <div className="block_type" onClick={() => { props.addModule("quote") }}>
                        <i className="fas fa-quote-left"></i>
                        <p>Quote</p>
                    </div>

                    <div className="block_type" onClick={() => { props.addModule("image") }}>
                        <i className="fas fa-image"></i>
                        <p>Image</p>
                    </div>

                    <div className="block_type" onClick={() => { props.addModule("code") }}>
                        <i className="fas fa-code"></i>
                        <p>Code</p>
                    </div>

                    <div className="block_type" onClick={() => { props.addModule("line") }}>
                        <span>-</span>
                        <p>Separator</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post, ids) => dispatch(createPost(post, ids)),
        uploadImage: (url) => dispatch(uploadImage(url))
    }
}

const mapStateToProps = (state) => {
    return {
        totalPosts: state.firestore.ordered.totalItems,
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props, dispatch) => [
        ({ collection: 'totalItems'})
    ])
)(PostEditor)