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
    
        default:
        return state
    }
}
export default chatReducer