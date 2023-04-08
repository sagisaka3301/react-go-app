import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './features/common/Header';
import Post from './features/post/Post';
import PostList from './features/post/postList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:postId" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;

/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
*/
