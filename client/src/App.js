import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageRender from "./PageRender";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/:page" element={<PageRender />} />
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
