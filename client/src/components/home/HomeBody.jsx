import React from 'react'
import '../../styles/posts.css'

function HomeBody() {
  const status = {
    borderRadius: "50%",
    width: "130px",
    height: "130px",
    position: "absolute",
    left: 'calc(50% - 65px)',
    top:"60px"
  };

  return (
    <>
      <div className=''>
        <section className="profile-feed">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">

                <div className="cardbox shadow-lg bg-white">

                    <div className="cardbox-heading">
                        <div className="dropdown float-right">
                            <button className="btn btn-flat btn-flat-icon" type="button" data-toggle="dropdown" aria-expanded="false">
                                <em className="fa fa-ellipsis-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-scale dropdown-menu-right" role="menu" style={{position: 'absolute', transform: 'translate3d(-136px, 28px, 0px)', top: "0px", left: "0px", "willChange": "transform"}}>
                                <a className="dropdown-item" href="#">Hide post</a>
                                <a className="dropdown-item" href="#">Stop following</a>
                                <a className="dropdown-item" href="#">Report</a>
                            </div>
                        </div>
                        <div className="media m-0">
                            <div className="d-flex mr-3">
                                <a href=""><img className="img-fluid rounded-circle" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="User" /></a>
                            </div>
                            <div className="media-body">
                                <p className="m-0">Emma Robinson</p>
                                {/* <small><span><i className="icon ion-md-pin"></i> London, England</span></small>
                                <small><span><i className="icon ion-md-time"></i> 1 hour ago</span></small> */}
                            </div>
                        </div>
                    </div>

                    <div className="cardbox-heading">
                        <img className="img-fluid" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.avb9nDfw3kq7NOoP0grM4wHaEK%26pid%3DApi&f=1&ipt=c3a21dd8f31b0748f619cf065a26c5da48a88fe6ab1285d2bf74a6e0835a395e&ipo=images" alt="Image" />
                    </div>
                    <div className="cardbox-base">
                        <ul className="float-right">
                            <li><a><i className="fa fa-comments"></i></a></li>
                            <li><a><em className="mr-5">46</em></a></li>
                            <li><a><i className="fa fa-share-alt"></i></a></li>
                            <li><a><em className="mr-3">05</em></a></li>
                        </ul>
                        <ul>
                            <li><a><i className="fa fa-thumbs-up"></i></a></li>
                            <li><a href="#"><img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" className="img-fluid rounded-circle" alt="User" /></a></li>
                            <li><a href="#"><img src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" className="img-fluid rounded-circle" alt="User" /></a></li>
                            <li><a href="#"><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" className="img-fluid rounded-circle" alt="User" /></a></li>
                            <li><a href="#"><img src="https://images.pexels.com/photos/6962108/pexels-photo-6962108.jpeg" className="img-fluid rounded-circle" alt="User" /></a></li>
                            <li><a><span>242 Likes</span></a></li>
                        </ul>
                    </div>
                    <div className="cardbox-comments">
                        <span className="comment-avatar float-left">
                            <a href=""><img className="rounded-circle" src="https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg" alt="..." /></a>
                        </span>
                        <div className="search">
                            <input placeholder="Write a comment" type="text" />
                            <button><i className="fa fa-camera"></i></button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</section>
      </div>
    </>
  )
}

export default HomeBody