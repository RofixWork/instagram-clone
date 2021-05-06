import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { toaster } from "evergreen-ui";
import { db, storage } from "../firebase/Config";
import firebase from "firebase";
const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [progressbar, setProgress] = useState(0);
  const publishPost = () => {
    if (title.trim() && file) {
      const upload = storage.ref(`images/${file.name}`).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                title,
                image: url,
                username: user.username,
                currentTime: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
      setTitle("");
      setFile(null);
      setProgress(0);
      toaster.success("Post created successfully");
    } else {
      toaster.warning("Please Fill Data...");
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        <div className="w-full bg-white rounded border px-4 py-2 relative">
          <progress
            className="w-full h-2 absolute top-0 left-0"
            value={progressbar}
          ></progress>
          <h2 className="text-xl font-semibold font-mono my-2">
            Create a new Post
          </h2>
          <input
            multiple
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-gray-400"
            placeholder={`What's on your mind, ${user.username}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center justify-between my-2">
            <div>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none hover:bg-gray-900"
                onClick={publishPost}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CreatePost;
