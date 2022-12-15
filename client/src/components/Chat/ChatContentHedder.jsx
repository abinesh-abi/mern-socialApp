import React from 'react'

function ChatContentHedder({otherUser}) {
  return (
<div className="chat-header clearfix">
    <div className="row">
        <div className="col-lg-6">
            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                <img src={`http://127.0.0.1:5000/images/profile/${otherUser?.avatar}.jpg`} alt="avatar" />
            </a>
            <div className="chat-about">
                <h6 className="m-b-0">{otherUser?.fullname}</h6>
                {/* <small>Last seen: 2 hours ago</small> */}
            </div>
        </div>
        {/* <div className="col-lg-6 hidden-sm text-right">
            <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
            <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
            <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
            <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
        </div> */}
    </div>
        </div>
  )
}

export default ChatContentHedder