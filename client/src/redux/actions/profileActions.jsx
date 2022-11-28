import {  postDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from './globalTypes'

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER" 
}


export const updateProfileUser = (data,auth,closeModel) =>async(dispatch)=>{
    const res = await postDataAPI('/user/edit',data,auth.token)
    console.log(res.data)
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