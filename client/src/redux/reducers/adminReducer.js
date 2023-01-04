import { ADMIN_TYPES } from "../actions/adminAction";


const intialSatate = {}

const adminReducer = (state = intialSatate,action)=>{
    switch (action.type) {
        case ADMIN_TYPES.ERROR:
            return {
                ...state,
                error:action.payload.error
            };
        case ADMIN_TYPES.GET_USERS:
            return {
                ...state,
                users:action.payload.users
            };
        case ADMIN_TYPES.SEARCH_USER:
            return {
                ...state,
                searchUsers:action.payload.searchUsers
            };
        case ADMIN_TYPES.GET_POSTS:
            return {
                ...state,
                posts:action.payload.posts
            };
        case ADMIN_TYPES.GET_REPORTS:
            return {
                ...state,
                reports:action.payload.reports
            };
        case ADMIN_TYPES.SEARCH_POSTS:
            return {
                ...state,
                searchPosts:action.payload.searchPosts
            };
        default:
            return state
    }
}

export default adminReducer;
