import { combineReducers } from "redux";
import auth from './authReducer'
import adminAuth from './adminAuthReducer'
import alert from "./alertReducer"
import profile from "./profileReducer"
import showErr from './showerrReduser'
import posts from './postReducer'
import chat from './chatReducer'

export default combineReducers ({
    auth,
    adminAuth,
    alert,
    profile,
    showErr,
    posts,
    chat
})