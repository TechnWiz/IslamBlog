import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home"
import Write from "./Write/Write"
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import PostsContent from './PostsContent/PostsContent';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<Write />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/content/:postId' element={<PostsContent />} />
      </Routes>
    </Router>
  )
}

export default App
