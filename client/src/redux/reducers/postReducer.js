import { POST_TYPES } from "../actions/postAction";


const initialState = {
    posts:[],
    pageNumber:1
}

const postReducer = (state = initialState , action)=>{
    switch (action.type) {
        case POST_TYPES.GET_POST:
            return{
                ...state,
                posts:action.payload?.posts
            };
        case POST_TYPES.PAGE_NUMBER:
            return{
                ...state,
                pageNumber:action.payload?.pageNumber
            };
    
        default:
            return state;
    }
}
export default postReducer