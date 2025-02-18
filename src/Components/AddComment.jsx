import { useState } from "react";
import axios from "axios";

import { BASE_URL } from "../config/config";

const AddComment = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState("");
  const [userComment, setUserComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postId) {
      alert("Please select a post first!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/add_comment`, {
        name,
        user_Comment: userComment,
        post: postId, // Attach post ID to the request
      });

      alert("Comment added successfully!");
      setName("");
      setUserComment("");

      // Refresh comments after adding a new one
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-4 bg-[#10243b]  rounded-lg shadow-md">
      <h2 className="text-xl text-[#00e5ff] font-bold mb-3">Add Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          className="p-2 border w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Comment"
          className="p-2 border w-full rounded"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className=" text-white p-2 rounded w-full  text-white bg-teal-500  hover:bg-teal-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddComment;
