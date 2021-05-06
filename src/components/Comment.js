import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { db } from "../firebase/Config";
const Comment = ({ id }) => {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState([]);
  const publishComment = (e) => {
    if (comment) {
      if (e.keyCode === 13) {
        db.collection("posts").doc(id).collection("comments").add({
          comment,
          username: user.username,
          currentTime: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("currentTime", "asc")
      .onSnapshot((snp) => {
        setGetComments(
          snp.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data().comment,
            username: doc.data().username,
          }))
        );
      });
  }, [id]);

  return (
    <div>
      {getComments.map((comment) => {
        return (
          <div key={comment.id} className="flex items-center px-4 my-2">
            <h3 className="font-semibold italic text-base font-sans text-gray-600">
              {comment.username}
            </h3>
            <h4 className="ml-2 font-semibold text-base font-sans">
              {comment.comment}
            </h4>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          placeholder="Comment..."
          className="py-2 px-4 focus:outline-none w-full border-t"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={publishComment}
        />
      </div>
    </div>
  );
};

export default Comment;
