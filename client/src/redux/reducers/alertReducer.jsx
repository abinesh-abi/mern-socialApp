import { GLOBALTYPES } from "../actions/globalTypes";

const intialSatate = {}

const alertReducer = (state = intialSatate,action)=>{
    switch (action.type) {
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state
    }
}

export default alertReducer;