import { patchDataAPI, postDataAPI } from '../../utils/fetchData'
import {GLOBALTYPES} from './globalTypes'

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER" 
}


export const updateProfileUser = (data,auth,closeModel) =>async(dispatch)=>{
    const res = await postDataAPI('/user/edit',data,auth.token)
    if (res.data.status) {
        console.log(auth)
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