import {  getDataAPI, postDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from './globalTypes'

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
    ERROR:'ERROR',
    POSTS:'POSTS'
}

export const getProfileUsers = ({id, auth}) => async (dispatch) => {

    try {
        // dispatch({type: PROFILE_TYPES.LOADING, payload: true})
        const users  = await getDataAPI(`/user/${id}`, auth.token)
        // const posts = await getDataAPI(`/user_posts/${id}`, auth.token)
        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload:{user:users.data.user} 
        })

    } catch (err) {
        dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
            error: err.response.data.msg,
        },
        });
    }
    
}

export const updateProfileUser = (data,auth,closeModel) =>async(dispatch)=>{
    const res = await postDataAPI('/user/edit',data,auth.token)
    if (!res.data.status) {
           return dispatch({
            type: GLOBALTYPES.SHOW_ERR,
            payload: {
                message: res.data.message,
            },
            });
    }
            dispatch({
                type:GLOBALTYPES.AUTH,
                payload:{
                    ...auth,
                    user:{
                        ...auth.user,
                        ...data
                    }
                }
            })
            dispatch({
            type: GLOBALTYPES.SHOW_ERR,
            payload: {
                message: '',
            },
            });
            closeModel()
}
export const updateProfilePhoto = (data,auth,closeModel) =>async(dispatch)=>{
    // const res = await postDataAPI('/user/edit',data,auth.token)
    const res = await postDataAPI('/user/editImage',data,auth.token)
    if (res.data.status) {
            dispatch({
                type:GLOBALTYPES.AUTH,
                payload:{
                    ...auth,
                    user:{
                        ...auth.user,
                        ...data
                    }
                }
            })
            closeModel()
    }
            
}

export const getUserPosts = ({id,auth,pageNumber}) =>async(dispatch)=>{
    try {
        if (pageNumber == 1) {
            const res = await getDataAPI(`/user/userPosts/${id}/${pageNumber}`,auth.token)
            dispatch({
                type: PROFILE_TYPES.POSTS,
                payload:{posts:res.data.data} 
            })
        }

    } catch (error) {
        console.log(error)
        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload:{error:error.message} 
        })
    }
}