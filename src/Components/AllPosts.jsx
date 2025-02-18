import { useEffect, useState } from "react";
import axios from "axios";
import AddComment from "./AddComment";
import { BASE_URL } from "../config/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get_category`)
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all_post`, {
        params: {
          category: selectedCategory,
          date_filter: selectedDateFilter,
          page: page, // Pass the current page number to the backend
        },
      })
      .then((res) => {
        setPosts(res.data.data || []);
        setTotalPages(res.data.total_pages || 1);
        setSelectedPostId(null); // Reset selected post when filtering
        setComments([]); // Clear comments on filter change
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [selectedCategory, selectedDateFilter, page]);

  const fetchComments = (postId) => {
    setSelectedPostId(postId);
    axios
      .get(`${BASE_URL}/get_comment/${postId}/`)
      .then((res) => setComments(res.data.data || []))
      .catch((err) => console.error("Error fetching comments:", err));
  };

  return (
    <div className="p-6 bg-[#0a1929]">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filter Sidebar */}
        <div className="md:w-1/3 p-4 border border-gray-500 rounded-lg">
          <h2 className="text-2xl font-bold text-[#00e5ff] mb-4 text-center">
            Filters
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-400">Select Category</h3>
            <select
              className="bg-[#0a1929] p-2 border w-full rounded text-gray-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-400">Select Date</h3>
            <select
              className="bg-[#0a1929] text-gray-400 p-2 border w-full rounded"
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>
        </div>

        {/* Posts Section */}
        <div className="md:w-2/3 p-4 bg-[#0a1929] border border-gray-500 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#00e5ff] mb-4">All Posts</h2>
          <ul className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post.id}
                  className="p-4 bg-[#10243b] rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl"
                >
                  <h3 className="text-xl font-semibold text-[#00e5ff]">
                    {post.title || "Untitled Post"}
                  </h3>
                  <p className="text-gray-600">
                    {post.category_name || "Uncategorized"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>

                  {/* Buttons */}
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setShowModal(true);
                      }}
                    >
                      Add Comment
                    </button>

                    <button
                      className={`${
                        selectedPostId === post.id
                          ? "bg-green-500"
                          : "bg-gray-500 hover:bg-gray-700"
                      } text-white px-3 py-1 rounded`}
                      onClick={() => fetchComments(post.id)}
                    >
                      See Comments
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No posts available.</p>
            )}
          </ul>

          {/* Comments Section */}
          {selectedPostId && (
            <>
              <h2 className="text-2xl font-bold text-[#00e5ff] mb-4 mt-6">
                Comments
              </h2>
              {comments.length > 0 ? (
                <ul
                  className="space-y-2"
                  style={{
                    maxHeight: "300px", // Adjust as needed
                    overflowY: comments.length > 3 ? "scroll" : "auto",
                  }}
                >
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="p-3 bg-[#10243b] rounded-lg shadow"
                    >
                      <h4 className="font-semibold text-[#00e5ff]">
                        {comment.name}
                      </h4>
                      <p className="text-gray-500">{comment.user_Comment}</p>
                      <p className="text-gray-700 text-sm">
                        {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No comments available.</p>
              )}
            </>
          )}

          {/* Comment Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-[#0a1929] bg-opacity-70 flex items-center justify-center">
              <div className="border border-white/20 bg-[#0a1929] p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                <AddComment
                  postId={selectedPostId}
                  onCommentAdded={() => {
                    fetchComments(selectedPostId);
                    setShowModal(false);
                  }}
                />
                <button
                  className="text-2xl text-red-400 px-5 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-white px-4 py-2">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
