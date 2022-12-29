import { GLOBALTYPES } from "../actions/globalTypes";

const intialSatate = {}

const autheReducer = (state = intialSatate,action)=>{
    switch (action.type) {
        case GLOBALTYPES.OTP:
            return action.payload;
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state
    }
}

export default autheReducer;