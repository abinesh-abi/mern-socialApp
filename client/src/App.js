import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile/id";
import { refreshToken } from "./redux/actions/authAction";

import '../src/styles/index.css'

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])

  return (
    <>
      <BrowserRouter>
         {auth.token && <Header />} 
        <Routes>
          <Route path="/" element={auth.token ? <Home /> :<Login />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/profile/:id" element={ <Profile /> } />
          <Route path="/:page/:id" element={<PageRender />} />

          {/* <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/signup" element={<h1>Sign up</h1>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
