
export const SOCKET_TYPES ={
    SET_SOCKET:'SET_SOCKET'
}
export const setSocket = ({socket})=>async dispatch =>{
    dispatch({
      type:SOCKET_TYPES.SET_SOCKET,
      payload:{
        socket
      }
    })
}