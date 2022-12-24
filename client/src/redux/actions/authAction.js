import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const val = await postDataAPI("/login", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: val.data.acces_tocken,
        user: val.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        message: val.data.message,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.message,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("/refresh_token");

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.acces_tocken,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.message,
        },
      });
    }
  }
};

export const reqestOtp=(data)=>async dispatch =>{
  try {
    const val = await postDataAPI("/reqestOtp", data);
    if (val.data.status) {
      dispatch({
        type:GLOBALTYPES.OTP,
        payload:{
          otpPage:true
        }
      })
    }
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.message,
        otpPage:true
      },
    });
    
  }
}
export const registerUser = ({otp,email}) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const val = await postDataAPI("/register", {otp,email});
    if(!val.data.status) return

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: val.data.acces_tocken,
        user: val.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        message: val.data.message,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin')
    await postDataAPI('/logout')
    window.location.href='/'
    // dispatch({
    //   type:GLOBALTYPES.AUTH,
    //   payload:null
    // })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
