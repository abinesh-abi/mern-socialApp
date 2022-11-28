
import { GLOBALTYPES } from "../actions/globalTypes";

const intialSatate = {}

const adminAutyReducer = (state = intialSatate,action)=>{
    switch (action.type) {
        case GLOBALTYPES.ADMIN_AUTH:
            return action.payload;
        default:
            return state
    }
}

export default adminAutyReducer;
