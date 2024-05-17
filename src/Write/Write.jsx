import React, { useEffect, useRef, useState } from "react";
import "./Write.css";
import { Editor } from "@tinymce/tinymce-react";
import { auth, db, storage } from "../Config/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postErr, setPostErr] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const navigate = useNavigate();

  const types = ["image/png", "image/jpeg"];

  const postImageHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setPostImg(selectedFile);
        setPostErr("");
      } else {
        setPostImg(null);
        setPostErr("Please select a valid image file (jpg/jpeg).");
      }
    } else {
      setPostImg(null);
      setPostErr("Please select an image.");
    }
  };

  const postsCollectionRef = collection(db, "posts");

  const addPosts = async (event) => {
    event.preventDefault();

    // Check if user is authenticated
    if (!auth.currentUser) {
      alert("Not authenticated users are not allowed to add posts.");
      return;
    }

    try {
      const storageRef = ref(storage, `postImages/${postImg.name}`);
      await uploadBytes(storageRef, postImg);

      const imgUrl = await getDownloadURL(storageRef);

      // Add post with author's displayName to the posts collection
      await addDoc(postsCollectionRef, {
        postTitle,
        postDesc,
        postImgUrl: imgUrl,
        authorDisplayName: auth.currentUser.displayName, // Save the displayName of the current user as authorDisplayName
        authorDisplayAvatar: auth.currentUser.photoURL, // Save the Avatar of the current user as authorDisplayAvatar
      });
      alert("Post added successfully");
      navigate("/");
      setPostTitle("");
      setPostDesc("");
      setPostImgUrl("");
      setPostImg(null);
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
      setPostErr("Error adding post...Try again later");
    }
  };

  useEffect(() => {
    if (postTitle && postDesc && postImg) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [postTitle, postDesc, postImg]);

  const editorRef = useRef();

  return (
    <>
      {!isAuth ? (
        <Link className="text-center" to="/auth">
          <button className="btn btn-md btn-primary">LogIn</button>
        </Link>
      ) : (
        <div className="create-post">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Create Post</h2>
                    <form onSubmit={addPosts}>
                      <div className="form-group mb-3">
                        <label htmlFor="postTitle" className="mb-2">
                          Title
                        </label>
                        <input
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                          required
                          type="text"
                          className="form-control"
                          id="postTitle"
                          placeholder="Enter title"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="postDescription" className="mb-2">
                          Description
                        </label>
                        <Editor
                          value={postDesc}
                          onEditorChange={(content) => setPostDesc(content)}
                          required
                          className="form-control"
                          id="postDescription"
                          apiKey="7b3qo26v7x3yhjijoadfioqjnebztp298dkvx36y3ipbvhl4"
                          init={{
                            content_css: "styles/tinymce-custom-styles.css",
                            menubar: false,
                            height: 200,
                          }}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="postImage" className="mb-2">
                          Image
                        </label>
                        <input
                          onChange={postImageHandler}
                          required
                          type="file"
                          className="form-control"
                          id="postImage"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className={`write_btn ${
                            isFormComplete ? "write_btn_active" : ""
                          }`}
                        >
                          Publish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;