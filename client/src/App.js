import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const { auth ,adminAuth} = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(refreshToken())
    dispatch(adminRefreshToken())
  },[dispatch])

  return (
    <>
      <BrowserRouter>
         {(auth.token || adminAuth.token) && <Header />} 
        <Routes>
          <Route path="/" element={auth.token ? <Home /> :<Login />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/profile/:id" element={ <Profile /> } />
          <Route path="/:page/:id" element={<PageRender />} />

          {/* admin */}
          <Route path="/admin" element={ adminAuth.token?<Dashboard />:<AdminLogin />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
