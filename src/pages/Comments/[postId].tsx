import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type FormEvent, useState } from "react";
import ViewComments from "../ViewComments";

// type CommentResult = {
//   id: string;
//   contents: string;
//   creationDate: Date;
//   author: {
//     id: string;
//     // Include other User properties as needed
//   };
//   authorId: string;
//   post: {
//     id: string;
//     // Include other Post properties as needed
//   };
//   postId: string;
// };

export default function Comments() {
  const router = useRouter();
  const { postId } = router.query;
  //   const [data, setData] = useState<
  //     { contents: string; author: { id: string } }[]
  //   >([]);
  const [contents, setContents] = useState<string>("");

  const addCommentMutation = api.post.addComment.useMutation({
    onSuccess: (comment) => {
      //   const { contents, author } = comment;
      //   setData((prevData) => [
      //     ...prevData,
      //     {
      //       contents,
      //       author,
      //     },
      //   ]);
      window.location.reload();
      setContents("");
      console.log(comment);
    },
    onError: (error) => {
      // Handle error, display message, etc.
      console.error(error);
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log("Type of postId:", typeof postId);
    const postIdValue = postId as string;

    addCommentMutation.mutate({
      postId: postIdValue,
      contents,
    });
  };
  return (
    <div>
      <div className="text-align mb-5 mt-5 flex w-screen items-center justify-center">
        <button
          className="button bg-slate-700 text-white"
          onClick={(e) => {
            e.preventDefault();
            router.push("/").catch(console.log);
          }}
        >
          Home
        </button>
      </div>
      <form
        className="flex flex-col items-center justify-center text-center"
        onSubmit={onSubmit}
      >
        <div>
          <label htmlFor="contents" className="mr-5 text-white">
            {" "}
            Enter your comment:{" "}
          </label>
          <input
            type="text"
            id="contents"
            name="contents"
            value={contents}
            onChange={(e) => {
              e.preventDefault();
              setContents(e.target.value);
            }}
            className="mr-5 rounded border bg-slate-700 p-2 text-white"
            required
          ></input>
          <button className="button bg-slate-700 text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div>
        {typeof postId === "string" ? (
          <ViewComments postId={postId} />
        ) : (
          <p>edge case</p>
        )}
      </div>
    </div>
  );
}
