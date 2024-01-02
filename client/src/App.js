import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlog from "./pages/UserBlog";
import CreateBlog from "./pages/CreateBlog";
import Blogdetail from "./pages/BlogDetail";
import  { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleBlog from "./pages/SingleBlog";

function App() {
  return (
<>
      <Navbar />
      <Toaster  />
      <Routes>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/myblog" element={<UserBlog />}></Route>
        <Route path="/blogdetail/:id" element={<Blogdetail/>}></Route>
        <Route path="/viewblog/:id" element={<SingleBlog/>} />
        <Route path="/createblog" element={<CreateBlog />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
</>
  );
}

export default App;
