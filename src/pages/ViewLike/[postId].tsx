import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRef } from "react";

type MyData = {
  id: string;
  authorId: string;
  postId: string;
  author: {
    name: string | null;
  } | null;
};

export default function ViewLike() {
  const router = useRouter();
  const { postId } = router.query;
  const [data, setData] = useState<MyData[]>([]);

  const viewLikeMutation = api.post.viewLikes.useMutation({
    onSuccess: (data) => {
      // Handle success, reset fields, etc.
      setData(data);
      console.log(data);
    },
    onError: (error) => {
      // Handle error, display message, etc.
      console.error("Error updating profile:", error);
    },
  });

  const prevPostIdRef = useRef<string | string[] | undefined>('initial');

  useEffect(() => {
    if (postId && postId !== prevPostIdRef.current) {
      // Convert postId to a string if needed
      console.log("ref match");
      const postIdStr = String(postId);

      // Run the mutation with postIdStr
      viewLikeMutation.mutate({
        postId: postIdStr,
      });

      // Update the ref with the current postId
      prevPostIdRef.current = postIdStr;
    }
  }, [postId, viewLikeMutation]);

  

  return (
    <div>
      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          router.push("/").catch(console.log);
        }}
      >
        Go Back Home
      </button>
      <h1>The value of postID is: {postId}</h1>
      <ul>
        {data && data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>
              <p>ID: {item.id}</p>
              <p>Author ID: {item.authorId}</p>
              <p>Post ID: {item.postId}</p>
              {item.author && <p>Author Name: {item.author.name}</p>}
            </li>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </ul>
    </div>
  );
}
