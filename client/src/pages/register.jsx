import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";
import { registerUser, reqestOtp } from "../redux/actions/authAction";

function Register() {
  const [err, setErr] = useState('');
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  useEffect(() => {
    if (alert?.message) setErr(alert.message);
  });

  // react-hook-form configoration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(reqestOtp(data))
    setEmail(data.email)
  };

  function sendOtp() {
    dispatch(registerUser({otp,email}))
  }

  return (
    auth?.otpPage ? 

      <div className="content">
        <div className="container">
          <div className="row">
            <AuthLeftPanel />
            <div className="col-md-6 contents" style={{ marginTop: "5vh" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Enter OTP</h3>
                  </div>
                  <p className="text-danger text-center">{err} </p>
                      <input
                        type="number"
                        className="form-control"
                        id="otp"
                        value={otp}
                        onChange={e=>setOtp(e.target.value)}
                         />
                        <button onClick={sendOtp} className="btn btn-block btn-primary mt-3">Verify Otp</button>

                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    :
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <AuthLeftPanel />
            <div className="col-md-6 contents" style={{ marginTop: "5vh" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Sign Up</h3>
                  </div>
                  <p className="text-danger text-center">{err} </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group first">
                      <label htmlFor="username">name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
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
                        {errors.fulrname?.type === "minLength" && (
                          <span>Enter three or more characters</span>
                        )}
                        {errors.fullname?.type === "maxLength" && (
                          <span>name must be less than 20 characters</span>
                        )}
                      </span>
                    </div>
                    <div className="form-group first">
                      <label htmlFor="username">User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
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
                    <div className="form-group first">
                      <label htmlFor="username">Email</label>
                      <input
                        type="email"
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
                        <div className="form-group last mb-4">
                      <label htmlFor="password">Date Of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        // />
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
                    <div className="row justify-content-between mx-0 mb-4">
                    <label htmlFor="male">
                        Male: <input type="radio" name="gender" id="male" value='male'
                        {...register("gender", {
                          required: true,
                        })}
                      />

                    </label>
                    <label htmlFor="female">
                        Female: <input type="radio" name="gender" id="female" value='female' 
                        {...register("gender", {
                          required: true,
                        })}
                      />

                    </label>
                    <label htmlFor="others">
                        Other: <input type="radio" name="gender" id="others" value='others'
                        {...register("gender", {
                          required: true,
                        })}
                      />

                    </label>
                      {
                        errors.gender?.type === 'required' && <span className="text-danger">choose this feild</span>
                      }
                    </div>

                    <input
                      type="submit"
                      value="Signup"
                      className="btn btn-block btn-primary"
                    />
                  </form>
                  <div className="pt-2">
                    <p>
                      you have a account ? <Link to={"/login"}>Login ?</Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
