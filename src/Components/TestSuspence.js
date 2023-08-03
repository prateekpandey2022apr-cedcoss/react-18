import React, { Suspense } from "react";

let status = "pending";
let result;

// Start fetching posts even before rendering begins
const userId = JSON.parse(localStorage.getItem("authenticatedUser"))?.id;
const postsData = fetchPosts(userId);

// Posts component (definition)
const Posts = () => {
  // No need for loading states
  const posts = postsData();
  return (
    <div>
      {posts.map((post, idx) => (
        <p>{post.title}</p>
      ))}
    </div>
  );
};

// Fetch external data
function fetchPosts(userId) {
  let url = `https://jsonplaceholder.typicode.com/posts${
    userId ? "?userId=" + userId : ""
  }`;
  let fetching = fetch(url)
    .then((res) => res.json())
    // Fetch request has gone well
    .then((success) => {
      status = "fulfilled";

      result = success;
    })
    // Fetch request has failed
    .catch((error) => {
      status = "rejected";

      result = error;
    });

  return () => {
    if (status === "pending") {
      throw fetching; // Suspend(A way to tell React data is still fetching)
    } else if (status === "rejected") {
      throw result; // Result is an error
    } else if (status === "fulfilled") {
      return result; // Result is a fulfilled promise
    }
  };
}

const TestSuspence = () => {
  return (
    <Suspense fallback="Loading ....">
      <Posts />
    </Suspense>
  );
};

export default TestSuspence;
