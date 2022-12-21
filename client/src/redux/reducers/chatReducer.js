import { CHAT_TYPES } from "../actions/chatAction";
import { PROFILE_TYPES } from "../actions/profileActions";

const initialState ={
    messages:[]
}

const chatReducer = (state=initialState,action)=>{
    switch (action.type) {
        case CHAT_TYPES.GET_MESSAGES:
        return{
            ...state,
            messages:action.payload.messages
        }
        case CHAT_TYPES.GET_OTHER_USER:
        return{
            ...state,
            otherUser:action.payload.otherUser
        }

        case CHAT_TYPES.GET_ALL_CHAT:
        return{
            ...state,
            allChat:action.payload.allChat
        }

        case CHAT_TYPES.CURRENT_CHAT:
        return{
            ...state,
            currentChat:action.payload.currentChat
        }
    
        case CHAT_TYPES.ONLINE_USERS:
        return{
            ...state,
            onlineUsers:action.payload.onlineUsers
        }

        case CHAT_TYPES.IS_VIDEO_CALL:
        return{
            ...state,
            isVideoCall:action.payload.isVideoCall
        }

        case CHAT_TYPES.IS_RECEVED_CALL:
        return{
            ...state,
            isRecevedCall:action.payload.isRecevedCall
        }

        case CHAT_TYPES.SOCKET:
        return{
            ...state,
            socket:action.payload.socket
        }

        case CHAT_TYPES.CURRENT_STREAM:
        return{
            ...state,
            currentStream:action.payload.currentStream
        }

        case CHAT_TYPES.OTHERS_STREAM:
        return{
            ...state,
            otherStream:action.payload.otherStream
        }
    
        default:
        return state
    }
}
export default chatReducer