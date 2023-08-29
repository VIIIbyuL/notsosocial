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

  const prevPostIdRef = useRef<string | string[] | undefined>("initial");

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
      <div className="mb-10 mt-10 flex w-screen items-center justify-center text-center">
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            router.push("/").catch(console.log);
          }}
        >
          Home
        </button>
      </div>

      <div className="flex justify-center p-5">
        <div className="flex w-[430px] items-center justify-center rounded-lg bg-slate-700 p-10">
          <div className="h-[500px] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col items-center justify-center">
              <ul className="flex w-screen flex-col items-center gap-10 text-center">
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <li
                      key={item.id}
                      className="w-[350px] max-w-md rounded-lg bg-slate-600 p-5 text-white shadow-md"
                    >
                      {item.author && (
                        <p className="text-sm text-gray-500">
                          {item.author.name} likes this :)
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <p className="text-white">No data available.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
