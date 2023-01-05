import { FRIENDS_TYPES } from "../actions/friendsAction";

const initialState = {
    followers:{},
    followings:{},
    requests:{},
    followersPageNumber:1,
    followingsPageNumber:1,
    reqestsPagNumber:1
}

const friendsReducer= (state = initialState,action)=>{

    switch (action.type) {
        case FRIENDS_TYPES.GET_FOLLOWERS:
            return{
                ...state,
                followers:action.payload.followers
            }
        case FRIENDS_TYPES.GET_FOLLOWINGS:
            return{
                ...state,
                followings:action.payload.followings
            }
        case FRIENDS_TYPES.GET_REQUESTS:
            return{
                ...state,
                requests:action.payload.requests
            }
        case FRIENDS_TYPES.FOLLOWERS_PAGE_NUMBER:
            return{
                ...state,
                followersPageNumber:action.payload?.pageNumber
            };
        case FRIENDS_TYPES.FOLLOWINGS_PAGE_NUMBER:
            return{
                ...state,
                followingsPageNumber:action.payload?.pageNumber
            };
        case FRIENDS_TYPES.REQUESTS_PAGE_NUMBER:
            return{
                ...state,
                reqestsPagNumber:action.payload?.pageNumber
            };

        default:
            return state;
        }
}
export default friendsReducer