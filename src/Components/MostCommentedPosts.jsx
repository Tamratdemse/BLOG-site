"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

export default function MostCommentedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/most_commented`)
      .then((res) => setPosts(res.data.data || []))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="w-full bg-[#0a1929]  rounded-md text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3 text-[#00e5ff]">
              Top Posts
            </h2>
            <p className="text-gray-400">
              Check out our most engaging content based on reader comments and
              discussions.
            </p>
          </div>

          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  className="bg-[#10243b] group relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-b from-transparent to-black/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[#00e5ff] mb-1">{post.category_name}</p>
                    <p className="text-gray-300 text-sm">
                      {post.num_comments} Comments
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
