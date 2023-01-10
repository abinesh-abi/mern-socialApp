import { getDataAPI } from "../../utils/fetchData"

export const CHAT_TYPES = {
    // LOADING: "LOADING",
    GET_CHAT: "GET_CHAT" ,
    GET_MESSAGES:'GET_MESSAGES',
    GET_OTHER_USER:'GET_OTHER_USER',
    GET_ALL_CHAT:'GET_ALL_CHAT',
    CURRENT_CHAT:'CURRENT_CHAT',
    ONLINE_USERS:'ONLINE_USERS',
    IS_VIDEO_CALL:'IS_VIDEO_CALL',
    IS_RECEVED_CALL:'IS_RECEVED_CALL',
    SOCKET:'SOCKET',
    CURRENT_STREAM:'CURRENT_STREAM',
    OTHERS_STREAM:'OTHERS_STREAM',
    ENDCALL:'ENDCALL',
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

export const EndCall = ({stream})=>async dispatch =>{
      stream?.getAudioTracks()[0]?.stop();
      stream?.getVideoTracks()[0]?.stop();

    // end receved call
    dispatch({
    type:CHAT_TYPES.IS_RECEVED_CALL,
    payload:{isRecevedCall:false}
    })
    // end videocall
    dispatch({
        type:CHAT_TYPES.IS_VIDEO_CALL,
        payload:{
            isVideoCall:false
        }
    })
    
}