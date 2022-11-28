import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileUser } from "../../redux/actions/profileActions"



const EditFromModal =({user,dob})=>{

  const {auth,showErr} = useSelector(state=>state)

  let [err,setErr] = useState(showErr?.message)

  const dispatch = useDispatch()

  let date = new Date(dob)?.toLocaleDateString()?.split('/').reverse().join('-')

// react-hook-form configoration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const closeModel =()=>{
        // close bootstrap model
        document.getElementById("editDetails").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
  }
  useEffect(()=>{
    setErr(showErr?.message)
  },[showErr?.message])


  const onSubmit = (data) => {
    // postDataAPI('/user/edit',data,auth.token).then(({data})=>{
    //   if (data.status) {
    //     userUpdate()
    //     // close bootstrap model
    //     document.getElementById("editDetails").classList.remove("show", "d-block");
    //     document.querySelectorAll(".modal-backdrop")
    //         .forEach(el => el.classList.remove("modal-backdrop"));
    //   }else{
    //     setErr(data.message)
    //   }
    // })

    dispatch(updateProfileUser(data,auth,closeModel))

  };

  return(
    <div className="modal fade" id="editDetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit User</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <div className="form-group row">
          <span className="mx-auto text-danger">{err}</span>
        </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEmail3" placeholder="Name"
                defaultValue={user?.fullname}
                {...register("fullname", {
                  required: true,
                  pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
                  minLength: 3,
                  maxLength: 20,
                })}
              />
              <span className="text-danger">
                {errors.fullname?.type === "required" && (
                  <span>Name is required</span>
                )}
                {errors.fullname?.type === "pattern" && (
                  <span>Enter valied Name</span>
                )}
                {errors.fullname?.type === "minLength" && (
                  <span>Enter three or more characters</span>
                )}
                {errors.fullname?.type === "maxLength" && (
                  <span>name must be less than 20 characters</span>
                )}
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">User Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" placeholder="User Name"
                defaultValue={user?.username}
                        {...register("username", {
                          required: true,
                          pattern: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/,
                          minLength: 3,
                          maxLength: 20,
                        })}
                      />
                      <span className="text-danger">
                        {errors.username?.type === "required" && (
                          <span>User Name is required</span>
                        )}
                        {errors.username?.type === "pattern" && (
                          <span>Enter valied Name</span>
                        )}
                        {errors.username?.type === "minLength" && (
                          <span>Enter three or more characters</span>
                        )}
                        {errors.username?.type === "maxLength" && (
                          <span>user name must be less than 20 characters</span>
                        )}
                      </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" placeholder="Email" 
                defaultValue={user?.email}
                        {...register("email", {
                          required: true,
                          pattern:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                        })}
                      />
                      <span className="text-danger">
                        {errors.email?.type === "required" && (
                          <span>Email is required</span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span>Enter valied Email</span>
                        )}
                      </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="dob" className="col-sm-2 col-form-label">DOB</label>
            <div className="col-sm-10">
              <input type="date" className="form-control" id="dob" placeholder="DOB" 
                defaultValue={date}
                        {...register("dob", {
                          required: true,
                        })}
                      />
                      <span className="text-danger">
                        {errors.dob?.type === "required" && (
                          <span>DOB is required</span>
                        )}
                      </span>
            </div>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>
  )
}
export default EditFromModal