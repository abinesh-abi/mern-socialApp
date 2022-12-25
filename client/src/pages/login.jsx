import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftPanel from "../components/AuthLeftPanel";

function Login() {
  const [err, setErr] = useState();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();

  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert?.message) setErr(alert.message);
  });

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  // react-hook-form configoration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <AuthLeftPanel />
            <div className="col-md-6 contents" style={{ marginTop: "5vh" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Log In</h3>
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
                  <div className="pt-2">
                    <p>
                      Don't Have accout ?{" "}
                      <Link to={"/register"}>Sign up ?</Link>{" "}
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

export default Login;
