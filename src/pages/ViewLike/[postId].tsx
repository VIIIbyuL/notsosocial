import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { api } from "~/utils/api";

type MyData = {
  id: string;
  authorId: string;
  postId: string;
};

export default function ViewLike() {
  const router = useRouter();
  const { postId } = router.query;
  const [data, setData] = useState<MyData[]>([]);

  // Memoize the viewLikeMutation function to prevent unnecessary re-renders
  const viewLikeMutation = useMemo(() => {
    return api.post.viewLikes.useMutation({
      onSuccess: (data) => {
        // Handle success, reset fields, etc.
        setData(data);
      },
      onError: (error) => {
        // Handle error, display message, etc.
        console.error("Error updating profile:", error);
      },
    });
  }, []);

  // Use useEffect to run the mutation when postId changes
  useEffect(() => {
    if (postId) {
      // Convert postId to a string if needed
      const postIdStr = String(postId);

      // Run the mutation with postIdStr
      viewLikeMutation.mutate({
        postId: postIdStr,
      });
    }
  }, [postId, viewLikeMutation]);

  return (
    <div>
      <h1>The value of postID is: {postId}</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            <p>Author ID: {item.authorId}</p>
            <p>Post ID: {item.postId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
