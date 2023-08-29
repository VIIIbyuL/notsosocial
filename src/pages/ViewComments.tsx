import { useEffect, useState, useRef } from "react";
import { api } from "~/utils/api";

interface ViewCommentsProps {
  postId: string;
}

type CommentData = {
  id: string;
  authorId: string;
  postId: string;
  author: {
    name: string | null;
  } | null;
  contents: string;
  creationDate: Date;
};

function ViewComments({ postId }: ViewCommentsProps) {
  // Use the postId prop as a string
  const [data, setData] = useState<CommentData[]>([]);

  const ViewCommentMutation = api.post.viewComments.useMutation({
    onSuccess: (data) => {
      console.log("submitted", data);
      setData(data);
    },
    onError: (err) => {
      console.log("unable", err);
    },
  });
  const prevPostIdRef = useRef<string | string[] | undefined>("initial");

  useEffect(() => {
    if (postId && postId !== prevPostIdRef.current) {
      // Convert postId to a string if needed
      console.log("ref match");
      const postIdStr = String(postId);

      // Run the mutation with postIdStr
      ViewCommentMutation.mutate({
        postId: postIdStr,
      });

      // Update the ref with the current postId
      prevPostIdRef.current = postIdStr;
    }
  }, [postId, ViewCommentMutation]);

  return (
    <div>
      <div className="flex justify-center p-5">
        <div className="flex w-[430px] items-center justify-center rounded-lg bg-slate-700 p-10">
          <div className="h-[500px] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col items-center justify-center">
              <ul className="flex w-screen flex-col items-center gap-10 text-center">
                {data && data.length > 0 ? (
                  data
                    .slice()
                    .reverse()
                    .map((item) => (
                      <li
                        className="w-[350px] max-w-md rounded-lg bg-slate-600 p-5 text-white shadow-md"
                        key={item.id}
                      >
                        <p className="text-sm text-gray-500">
                          {item.creationDate ? (
                            <span className="text-gray-400">
                              {new Date(item.creationDate).toLocaleString()}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>

                        {/* Comment Header */}
                        <div className="mb-2">
                          <p className="text-xl font-semibold">
                            {item.author && <>{item.author.name} says</>}
                          </p>
                        </div>

                        {/* Comment Content */}
                        <p className="text-gray-200">{item.contents}</p>
                      </li>
                    ))
                ) : (
                  <p>No comments available.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewComments;
