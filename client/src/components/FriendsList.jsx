import React from 'react'
import { Link } from 'react-router-dom'

function FriendsList() {
    
    let listDiv ={height:'50px',borderRadius: "3%",
         'position' :'relative'
}
    let listImage = {
                   borderRadius: "50%",
                   width: "40px",
                   height: "40px",
                   position: 'relative',
                   top:'4px'
                }

  return (
<div className="card py-3 shadowmt-3">
{/* <div className="py-3 shadow round mt-3"> */}
        <div className=" d-flex mb-3  align-items-center shadow-sm px-4 mx-1" style={listDiv}>
            <h4 className='mx-3'>Friends</h4>
        </div>

        <div className=" d-flex justify-content-between shadow-sm px-3 mx-1" style={listDiv}>
            <div className='d-flex'>
                <img
                className="img-fluid"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.GlXqxcR9EmviN5kuwaUsMQHaIB%26pid%3DApi&f=1&ipt=d9c3d42c247ca4bad27b65968b43449ec44970135fa3e1a19ec6bc90bd86a5b6&ipo=images"
                style={listImage}
                alt=""
                />
                <p className='mx-3' style={{'lineHeight': '45px',}}>User1</p>
            </div>
        <div className='d-flex justify-content-end'>
            <Link className='mx-3' style={{'lineHeight': '45px',}}>Follow</Link>
        </div>
        </div>
     </div>


    //  <div className="col-sm-3 col-sm  py-3" style={{
    //      height:'500px',
    //      borderRadius: "2%",
    //     //  border:"solid 1px",
    //      'box-shadow': '1px 2px 3px 4px rgba(20,20,20,0.4)'
    //     }}>
    //     <div className=" d-flex mb-3  align-items-center" style={listDiv}>
    //         <h4 className='mx-3'>Friends</h4>
    //     </div>

    //     <div className=" d-flex justify-content-between" style={listDiv}>
    //         <div className='d-flex'>
    //             <img
    //             className="img-fluid"
    //             src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.GlXqxcR9EmviN5kuwaUsMQHaIB%26pid%3DApi&f=1&ipt=d9c3d42c247ca4bad27b65968b43449ec44970135fa3e1a19ec6bc90bd86a5b6&ipo=images"
    //             style={listImage}
    //             alt=""
    //             />
    //             <p className='h4 mx-3' style={{'lineHeight': '45px',}}>User1</p>
    //         </div>
    //     <div className='d-flex justify-content-end'>
    //         <Link className='h4 mx-3' style={{'lineHeight': '45px',}}>Follow</Link>
    //     </div>
    //     </div>
    //  </div>
  )
}

export default FriendsList