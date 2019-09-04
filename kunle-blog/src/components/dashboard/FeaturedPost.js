import React from 'react'

const FeaturedPost = (props) => {
    return (
        <>
            <div className="featured_post">
                <div className="featured_post_image">
                    <img src="" alt=""/>
                </div>
                <div className="featured_post_info">
                    <header>
                        <h1 className="featured_post_info_title">Blog can be everything nowadays</h1>
                        <div className="featured_post_info_description">
                            <p>Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Dolores possimus culpa
                                officiis sed autem saepe aspernatur id ad,
                                doloremque quod recusandae dolor doloribus
                            nobis. Illum labore fugiat harum eos ab?</p>
                        </div>
                    </header>
                </div>
            </div>

            <div className="featured_post_arrow">
                <i class="fas fa-arrow-left"></i>
                <i class="fas fa-arrow-right"></i>
            </div>
        </>
    )
} 

export default FeaturedPost