import { combineReducers } from "redux";
import auth from './authReducer'
import alert from "./alertReducer"
import profile from "./profileReducer"
import showErr from './showerrReduser'

export default combineReducers ({
    auth,
    alert,
    profile,
    showErr
})