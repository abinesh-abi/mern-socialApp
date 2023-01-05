import { combineReducers } from "redux";
import auth from './authReducer'
import adminAuth from './adminAuthReducer'
import admin from './adminReducer'
import alert from "./alertReducer"
import profile from "./profileReducer"
import friends from "./friendsReducer"
import showErr from './showerrReduser'
import posts from './postReducer'
import chat from './chatReducer'
import socket from './socketReducer'

export default combineReducers ({
    auth,
    alert,
    profile,
    showErr,
    posts,
    chat,
    socket,
    adminAuth,
    admin,
    friends,
})