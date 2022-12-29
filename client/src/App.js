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
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import { adminRefreshToken } from "./redux/actions/adminAuthAction";
import Post from "./pages/post/id";
import { io } from "socket.io-client";
import config from "./utils/config";
import { setSocket } from "./redux/actions/socketActions";

function App() {
  const { auth ,adminAuth} = useSelector((state) => state);
  const dispatch = useDispatch()
  let socket = useRef(io(config.SERVER_URL))
  useEffect(()=>{
    dispatch(setSocket({socket}))
    // dispatch({
    //   type:'socket',
    //   payload:{
    //     socket
    //   }
    // })
    console.log('app')
  },[])
  // useEffect(()=>{
  //   socket?.current?.emit('addUser',auth?.user?._id)
  // },[auth?.user?._id])

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
          <Route path="/admin" element={ adminAuth.token?<Dashboard />:<AdminLogin />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
