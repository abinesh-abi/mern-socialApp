import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { postDataAPI } from '../../utils/fetchData';

function EditPassword() {
  let [err,setErr] = useState('')
  const {auth} = useSelector(state=>state)

// react-hook-form configoration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    postDataAPI('/user/editPassword',data,auth.token).then(({data})=>{
      if (data.status) {
        setErr('')
        // close  model
        document.getElementById("editPassword").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
      }else{
        setErr(data.message)
      }
    })
  };

  return(
    <>
    <div className="modal fade" id="editPassword" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Password</h5>
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
            <label htmlFor="oldPassword" className="col-sm-2 col-form-label">Old Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="oldPassword" placeholder="Old Passwor"
                        {...register("oldPassword", {
                          required: true,
                          minLength: 4,
                          maxLength: 20,
                        })}
                      />
                      <span className="text-danger">
                        {errors.oldPassword?.type === "required" && (
                          <span>Password is required</span>
                        )}
                        {errors.oldPassword?.type === "minLength" && (
                          <span>
                            Password must morethan or equal to 4 digit
                          </span>
                        )}
                        {errors.oldPassword?.type === "maxLength" && (
                          <span>Password must less than 20 digit</span>
                        )}
                      </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="newPassword" className="col-sm-2 col-form-label">New Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="newPassword" placeholder="New Password"
                        {...register("newPassword", {
                          required: true,
                          minLength: 4,
                          maxLength: 20,
                        })}
                      />
                      <span className="text-danger">
                        {errors.newPassword?.type === "required" && (
                          <span>Password is required</span>
                        )}
                        {errors.newPassword?.type === "minLength" && (
                          <span>
                            Password must morethan or equal to 4 digit
                          </span>
                        )}
                        {errors.newPassword?.type === "maxLength" && (
                          <span>Password must less than 20 digit</span>
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
    </>
  )

}

export default EditPassword

