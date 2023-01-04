import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUsers, updateProfilePhoto } from "../../redux/actions/profileActions";
import config from "../../utils/config";

const ImageEditModal =({image})=>{

  const profileStyle = {
    borderRadius: "50%",
    width: "130px",
    height: "130px",
  };

    let [newImage,setNewimage] = useState(null)
    const [imageUpdated,setImageUpdated] = useState(false)

    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state)

    const closeModel = ()=>{
        document.getElementById("exampleModalCenter").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }

    const updateImage = () =>{
        let data = new FormData()
        data.append('image',newImage)
        dispatch(updateProfilePhoto(data,auth,closeModel))
        dispatch(getProfileUsers({id:auth.user._id,auth})) 
        // postDataAPI('/user/editImage',data,auth.token)
        // .then(({data})=>{
        // document.getElementById("exampleModalCenter").classList.remove("show", "d-block");
        // document.querySelectorAll(".modal-backdrop")
        //     .forEach(el => el.classList.remove("modal-backdrop"));
        // })
    }

  return(
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">
          <div className="d-flex">
            {
              newImage ?
            <img
            className="img-fluid shadow mx-auto"
              src={URL.createObjectURL(newImage)}
              style={profileStyle}
              alt=""
            /> :
            <img
            className="img-fluid shadow mx-auto"
              src={`${config.SERVER_URL}/images/profile/${image}.jpg`}
              style={profileStyle}
              alt=""
            />
            }
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
              </div>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={e=>{
                    setImageUpdated(true)
                    setNewimage(e.target.files[0])
                  }}
                   />
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            { imageUpdated && <button onClick={updateImage} type="button" className="btn btn-primary">Save changes</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageEditModal