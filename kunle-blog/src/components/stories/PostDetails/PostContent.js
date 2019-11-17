import React, { Component } from 'react'

class PostContent extends Component {
    state = {

    }

    render() {
        let width = { width: 'calc((100% - 16px)/ 3)' };
        let {post} = this.props;
        let content = post ? post.content : ""
        // console.log(content)
        return (
            <div className="post_content">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        )
    }
}

export default PostContent

// {
//     post.content ?
//         post.content :
//         <>
//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>

//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>

//             <div className="image_list">
//                 <h3>Gallary photos</h3>
//                 <ul class="three">
//                     <li style={width}><img src="" alt="" /></li>
//                     <li style={width}><img src="" alt="" /></li>
//                     <li style={width}><img src="" alt="" /></li>
//                 </ul>
//             </div>

//             <h3>This might be where we are today</h3>
//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>

//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>

//             <h3>This might be where we are today</h3>
//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>

//             <div className="image_list">
//                 <h3>Gallary photos</h3>
//                 <ul class="four">
//                     <li><img src="" alt="" /></li>
//                     <li><img src="" alt="" /></li>
//                     <li><img src="" alt="" /></li>
//                     <li><img src="" alt="" /></li>
//                 </ul>
//             </div>

//             <p className="content">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Consectetur velit iure numquam exercitationem
//                 hic quibusdam esse atque,
//                 nulla facilis odio distinctio
//                 perferendis laboriosam minus sunt voluptates amet, ullam at quo.
//                     </p>
//         </>
// }