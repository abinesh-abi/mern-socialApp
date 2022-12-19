import { type } from "@testing-library/user-event/dist/type"
import { getDataAPI } from "../../utils/fetchData"

export const CHAT_TYPES = {
    // LOADING: "LOADING",
    GET_CHAT: "GET_CHAT" ,
    GET_MESSAGES:'GET_MESSAGES',
    GET_OTHER_USER:'GET_OTHER_USER',
    GET_ALL_CHAT:'GET_ALL_CHAT',
    CURRENT_CHAT:'CURRENT_CHAT'
}

export const fetchMessages = ({id,auth})=>async dispatch =>{
    getDataAPI(`/user/chat/message/getChat/${id}`,auth.token)
    .then(({data})=>{
        dispatch({
            type: CHAT_TYPES.GET_MESSAGES,
            payload:{messages:data.data} 
        })
    })
}

export const getOtherUser = ({id,auth})=>async dispatch =>{
        getDataAPI(`/user/${id}`,auth?.token)
        .then(({data})=>{
            dispatch({
                type:CHAT_TYPES.GET_OTHER_USER,
                payload:{otherUser:data.user}
            })
        })
}

export const getAllChat = ({auth})=>async dispatch =>{
    getDataAPI('/user/chat/get',auth?.token)
    .then(({data})=>{
        // setchatItems(data.data)
        dispatch({
            type:CHAT_TYPES.GET_ALL_CHAT,
            payload:{allChat:data.data}

        })
    })
}

export const getCurretChat = ({chatDetails})=>async dispatch =>{
    dispatch({
        type:CHAT_TYPES.CURRENT_CHAT,
        payload:{currentChat:chatDetails}

    })
}