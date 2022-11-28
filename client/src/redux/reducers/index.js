import { combineReducers } from "redux";
import auth from './authReducer'
import adminAuth from './adminAuthReducer'
import alert from "./alertReducer"
import profile from "./profileReducer"
import showErr from './showerrReduser'

export default combineReducers ({
    auth,
    adminAuth,
    alert,
    profile,
    showErr
})