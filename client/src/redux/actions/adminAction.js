import { getDataAPI } from "../../utils/fetchData";

export const ADMIN_TYPES ={
    ERROR:'ERROR',
    GET_USERS :'GET_USERS',
    SEARCH_USER:'SEARCH_USER',
    GET_POSTS:'GET_POSTS',
    SEARCH_POSTS:'SEARCH_POSTS',
    GET_REPORTS:'GET_REPORTS',
}

export const getUsers =({pageNumber})=>async dispatch=>{
    try {
        let {data} = await getDataAPI(`/admin/users/${pageNumber}`,'token')
        dispatch({
            type:ADMIN_TYPES.GET_USERS,
            payload:{
                users:data.data
            }
        })
    } catch (error) {
    dispatch({
      type: ADMIN_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}

export const searchUsers =({value})=>async dispatch=>{
    try {
        if (!value) {
            dispatch({
                type:ADMIN_TYPES.SEARCH_USER,
                payload:{
                    searchUsers:null
                }
            })
        }else{
            let {data} = await getDataAPI(`/admin/searchUsers/${value}`,'token')
            dispatch({
                type:ADMIN_TYPES.SEARCH_USER,
                payload:{
                    searchUsers:data.data
                }
            })
        }
    } catch (error) {
    dispatch({
      type: ADMIN_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}
export const getPosts =({pageNumber})=>async dispatch=>{
    try {
        let {data} = await getDataAPI(`/admin/posts/${pageNumber}`,'token')
        dispatch({
            type:ADMIN_TYPES.GET_POSTS,
            payload:{
                posts:data.data
            }
        })
    } catch (error) {
    dispatch({
      type: ADMIN_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}
export const getReports =({pageNumber})=>async dispatch=>{
    try {
        let {data} = await getDataAPI(`/admin/reports/${pageNumber}`)
        dispatch({
            type:ADMIN_TYPES.GET_REPORTS,
            payload:{
                reports:data.data
            }
        })
    } catch (error) {
    dispatch({
      type: ADMIN_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}
export const searchPosts =({value})=>async dispatch=>{
    try {
        if (!value) {
            dispatch({
                type:ADMIN_TYPES.SEARCH_POSTS,
                payload:{
                    searchPosts:null
                }
            })
        }else{
            let {data} = await getDataAPI(`/admin/searchPosts/${value}`,'token')
            dispatch({
                type:ADMIN_TYPES.SEARCH_POSTS,
                payload:{
                    searchPosts:data.data
                }
            })
        }
    } catch (error) {
    dispatch({
      type: ADMIN_TYPES.ERROR,
      payload: {
        error: error.message,
      },
    });
    }
}