import { getDataAPI, patchDataAPI } from "../../utils/fetchData";

export const FRIENDS_TYPES= {
    GET_FOLLOWERS:'GET_FOLLOWERS',
    GET_FOLLOWINGS:'GET_FOLLOWINGS',
    GET_REQUESTS:'GET_REQUESTS',
    FOLLOWERS_PAGE_NUMBER:'FOLLOWERS_PAGE_NUMBER',
    FOLLOWINGS_PAGE_NUMBER:'FOLLOWINGS_PAGE_NUMBER',
    REQUESTS_PAGE_NUMBER:'REQUESTS_PAGE_NUMBER',
    ERROR:'ERROR',
}
export const getFollowers = ({pageNumber,auth})=>async dispatch =>{
    try {
        const {data} = await getDataAPI(`/users/followersPaginated/${pageNumber}`,auth.token)
        dispatch({
        type: FRIENDS_TYPES.GET_FOLLOWERS,
        payload: {
            followers: data.data,
        },
        });
    } catch (error) {
    dispatch({
      type: FRIENDS_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}
export const getFollowings = ({pageNumber,auth})=>async dispatch =>{
    try {
        const {data} = await getDataAPI(`/users/followingsPaginated/${pageNumber}`,auth.token)
        dispatch({
        type: FRIENDS_TYPES.GET_FOLLOWINGS,
        payload: {
            followings: data.data,
        },
        });
    } catch (error) {
    dispatch({
      type: FRIENDS_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}
export const getRequests = ({pageNumber,auth})=>async dispatch =>{
    try {
        const {data} = await getDataAPI(`/user/followRequestPaginated/${pageNumber}`,auth.token)
        dispatch({
        type: FRIENDS_TYPES.GET_REQUESTS,
        payload: {
            requests: data.data,
        },
        });
    } catch (error) {
    dispatch({
      type: FRIENDS_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}


export const setFollowersPagenumber = ({pageNumber}) =>async dispatch=>{
    dispatch({
      type: FRIENDS_TYPES.FOLLOWERS_PAGE_NUMBER,
      payload: {
        pageNumber: pageNumber,
      },
    });
}
export const setFollowingsPagenumber = ({pageNumber}) =>async dispatch=>{
    dispatch({
      type: FRIENDS_TYPES.FOLLOWINGS_PAGE_NUMBER,
      payload: {
        pageNumber: pageNumber,
      },
    });
}
export const setRequestsPagenumber = ({pageNumber}) =>async dispatch=>{
    dispatch({
      type: FRIENDS_TYPES.REQUESTS_PAGE_NUMBER,
      payload: {
        pageNumber: pageNumber,
      },
    });
}
export const followUser = async({id,auth})=>{
        return patchDataAPI(`/user/${id}/follow`,{},auth.token)
}
export const unFollowUser = async({id,auth})=>{
        return patchDataAPI(`/user/${id}/unFollow`,{},auth.token)
}
export const acceptRequest = async({id,auth})=>{
       return patchDataAPI(`/user/${id}/acceptRequest`,{},auth.token)
}
export const rejectRepuest = async({id,auth})=>{
       return patchDataAPI(`/user/${id}/rejectRequest`,{},auth.token)
}