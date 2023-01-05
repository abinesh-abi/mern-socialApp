import { PROFILE_TYPES } from "../actions/profileActions";

const initialState ={
    loading:false,
    users:{},
    posts:{},
    pageNumber:1
}

const profileReducer = (state = initialState,action)=>{
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return{
                ...state,
                loading:action.payload
            }
        case PROFILE_TYPES.GET_USER:
            return{
                ...state,
                users:action.payload.user
            }
        case PROFILE_TYPES.POSTS:
            return{
                ...state,
                posts:action.payload.posts
            }
        case PROFILE_TYPES.ERROR:
            return{
                ...state,
                error:action.payload.error
            }
        case PROFILE_TYPES.PAGE_NUMBER:
            return{
                ...state,
                pageNumber:action.payload?.pageNumber
            };
            
        default:
            return state;
    }
}
export default profileReducer