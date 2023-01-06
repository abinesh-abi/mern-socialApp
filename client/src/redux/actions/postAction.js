import { patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";


export const POST_TYPES ={
    CREATE_POST :'CREATE_POST',
    GET_POST :'GET_POST',
    PAGE_NUMBER:'PAGE_NUMBER',
    GET_MORE_POST:'GET_MORE_POST',
}


export const getPost =(pageNumber,token)=>async dispatch=>{
    try {
        let {data} = await postDataAPI(`/user/posts/${pageNumber}`,{},token)
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
export const getMorePost =(pageNumber,token)=>async dispatch=>{
    try {
        let {data} = await postDataAPI(`/user/posts/${pageNumber}`,{},token)
        dispatch({
            type:POST_TYPES.GET_MORE_POST,
            payload:{
                posts:data.data
            }
        })
        dispatch({
          type: POST_TYPES.PAGE_NUMBER,
          payload: {
            pageNumber: pageNumber + 1,
          },
        });
    } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
    }
        
}


export const setPagenumber = ({pageNumber}) =>async dispatch=>{
    dispatch({
      type: POST_TYPES.PAGE_NUMBER,
      payload: {
        pageNumber: pageNumber,
      },
    });
}

export const likePost = ({auth,postId}) =>async dispatch=>{
        patchDataAPI(`/user/post/like`,{postId},auth.token)
        .then(({data})=>{

        }
        )
}