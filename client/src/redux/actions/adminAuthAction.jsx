import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const adminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const val = await postDataAPI("/admin/login", data);

    dispatch({
      type: GLOBALTYPES.ADMIN_AUTH,
      payload: {
        token: val.data.acces_tocken,
        admin: val.data.admin,
      },
    });

    localStorage.setItem("adminLogin", true);

    if (!data.status) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        message: val.data.message,
      },
    });
    }else{
        dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {}
        });
    }

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
export const adminRefreshToken = () => async (dispatch) => {
  const adminLogin = localStorage.getItem("adminLogin");
  if (adminLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("/admin/refresh_token");

      dispatch({
        type: GLOBALTYPES.ADMIN_AUTH,
        payload: {
          token: res.data.acces_tocken,
          admin: res.data.admin,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};