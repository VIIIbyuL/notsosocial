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
      Post id: {postId}
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
                        className="w-[350px] max-w-md overflow-x-auto overflow-y-hidden break-all rounded-lg bg-neutral-600 p-5"
                        key={item.id}
                      >
                        {/* Add margin-bottom (mb-4) to create vertical spacing */}
                        <p>ID: {item.id}</p>
                        <p>Author ID: {item.authorId}</p>
                        <p>Post ID: {item.postId}</p>
                        <p>contents: {item.contents}</p>
                        <p>
                          {item.creationDate
                            ? new Date(item.creationDate).toLocaleString()
                            : ""}
                        </p>
                        {item.author && <p>Author Name: {item.author.name}</p>}
                      </li>
                    ))
                ) : (
                  <p> So empty :( </p>
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
