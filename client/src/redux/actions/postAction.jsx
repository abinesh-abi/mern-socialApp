import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";


export const POST_TYPES ={
    CREATE_POST :'CREATE_POST',
    GET_POST :'GET_POST'
}

// export const createPost =({content,image,auth})=>{
//     console.log({content,image,auth},'onadf================')
// }

export const getPost =(token)=>async dispatch=>{
    try {
        let {data} = await postDataAPI(`/user/posts`,{},token)
        dispatch({
            type:POST_TYPES.GET_POST,
            payload:{
                posts:data.data
            }
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