import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { adminLogin } from "../../redux/actions/adminAuthAction";

function AdminLogin() {
  const [err, setErr] = useState();
  const { adminAuth,alert } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (alert?.message) setErr(alert.message);
  });

  
  useEffect(() => {
    if (adminAuth.token) navigate("/admin");
  }, [adminAuth.token, navigate]);

  // react-hook-form configoration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(adminLogin(data));
  };
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 contents" style={{ marginTop: "5vh" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Admin Login</h3>
                  </div>
                  <p className="text-danger text-center">{err}</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group first">
                      <label htmlFor="username">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
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
                    <div className="form-group last mb-4">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        // />
                        {...register("password", {
                          required: true,
                          minLength: 4,
                          maxLength: 20,
                        })}
                      />
                      <span className="text-danger">
                        {errors.password?.type === "required" && (
                          <span>Password is required</span>
                        )}
                        {errors.password?.type === "minLength" && (
                          <span>
                            Password must morethan or equal to 4 digit
                          </span>
                        )}
                        {errors.password?.type === "maxLength" && (
                          <span>Password must less than 20 digit</span>
                        )}
                      </span>
                    </div>

                    <input
                      type="submit"
                      value="Log In"
                      className="btn btn-block btn-primary"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin