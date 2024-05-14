import React, { useEffect, useState } from "react";
import "./Posts.css";
import { auth, db } from "../Config/FireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const redirect = (postId) => {
    navigate(`/content/${postId}`); // Assuming your route for post content is "/content/:postId"
  };

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="post_content mb-5 col-lg-4 col-md-6 col-sm-12"
              onClick={() => redirect(post.id)}
            >
              <img src={post.postImgUrl} alt={post.postTitle} />
              <div className="post_deatils">
                <h2 className="post_title">{post.postTitle}</h2>
                <div className="post_author">
                  <img src={post.authorDisplayAvatar} alt="userAvatar" />
                  <span>{post.authorDisplayName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;