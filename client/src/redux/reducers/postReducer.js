import { POST_TYPES } from "../actions/postAction";


const initialState = {
    posts:[],
}

const postReducer = (state = initialState , action)=>{
    switch (action.type) {
        case POST_TYPES.GET_POST:
            return{
                ...state,
                posts:action.payload?.posts
            };
    
        default:
            return state;
    }
}
export default postReducer