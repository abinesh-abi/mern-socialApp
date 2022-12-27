import { SOCKET_TYPES } from "../actions/socketActions"

const initialState = {
    socket:{}
}
const chatReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SOCKET_TYPES.SET_SOCKET:
        return{
            ...state,
            socket:action.payload.socket
        }
        default:
        return state
    }
}
export default chatReducer