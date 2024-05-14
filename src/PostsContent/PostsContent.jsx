import React, { useEffect, useState } from "react";
import "./PostsContent.css";
import { auth, db } from "../Config/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const PostsContent = () => {
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const { postId } = useParams(); // Accessing postId from route parameters

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", postId));
        if (postDoc.exists()) {
          setPost({ id: postDoc.id, ...postDoc.data() });
        } else {
          console.log("No such post!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]); // Fetch post whenever postId changes

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postcontent">
      <div className="container">
        <div key={post.id}>
          <div className="postconent_head">
            <div className="postcontent_texts">
              <h1>{post.postTitle}</h1>
              <div className="postcontent_details">
                <div className="post_author">
                  <img
                    src={currentUser && currentUser.photoURL}
                    alt="userphoto"
                  />
                  <span>{currentUser && currentUser.displayName}</span>
                </div>
              </div>
            </div>
            <img
              className="postcontent_img img-fluid"
              src={post.postImgUrl}
              alt={post.postTitle}
            />
          </div>
          <div
            className="postcontent_bottom"
            dangerouslySetInnerHTML={{ __html: post.postDesc }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostsContent;