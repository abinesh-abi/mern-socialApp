
import { GLOBALTYPES } from "../actions/globalTypes";

const intialSatate = {}

const showerrReducer = (state = intialSatate,action)=>{
    switch (action.type) {
        case GLOBALTYPES.SHOW_ERR:
            return action.payload;
        default:
            return state
    }
}

export default showerrReducer;