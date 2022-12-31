import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes} from "react-router-dom";


import Header from "./components/Header";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile/id";
import { refreshToken } from "./redux/actions/authAction";

import '../src/styles/index.css'
import AdminLogin from "./pages/admin/AdminLogin";
import { adminRefreshToken } from "./redux/actions/adminAuthAction";
import Post from "./pages/post/id";
import { io } from "socket.io-client";
import config from "./utils/config";
import { setSocket } from "./redux/actions/socketActions";
import { CHAT_TYPES } from "./redux/actions/chatAction";
import UserManagement from "./pages/admin/UserManagement";
import PostManagement from "./pages/admin/PostManagement";
import Reports from "./pages/admin/Reports";

function App() {
  const { auth ,adminAuth} = useSelector((state) => state);
  const dispatch = useDispatch()
  let socket = useRef()

  // useEffect(()=>{
  //   socket.current = io(config.SERVER_URL)
  //   dispatch(setSocket({socket}))
  // },[])

  useEffect(()=>{
    if (auth?.user?._id) {
      
    socket.current = io(config.SERVER_URL)
    dispatch(setSocket({socket}))
    socket?.current?.emit('addUser',auth?.user?._id)
        socket?.current?.on('getUsers',users=>{
            let userIds = users?.map(data=>data.userId)
            dispatch({
                type:CHAT_TYPES.ONLINE_USERS,
                payload:{
                    onlineUsers:userIds
                }
            })
        })
    }
  },[auth?.user?._id])

  useEffect(()=>{
    dispatch(refreshToken())
    dispatch(adminRefreshToken())
  },[dispatch])


  return (
    <>
      <BrowserRouter>
         {(auth.token || adminAuth.token) && <Header />} 
         <div className="pt-5">
        <Routes>
          <Route path="/" element={auth.token ? <Home /> :<Login />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/profile/:id" element={ <Profile /> } />
          <Route path="/:page/:id" element={<PageRender />} />
          {/* post */}
          <Route path="/post/:id" element={ <Post /> } />

          {/* admin */}
          <Route path="/admin" element={ adminAuth.token?<UserManagement />:<AdminLogin />} />
          <Route path="/admin/posts" element={ adminAuth.token?<PostManagement />:<AdminLogin />} />
          <Route path="/admin/reports" element={ adminAuth.token?<Reports />:<AdminLogin />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
