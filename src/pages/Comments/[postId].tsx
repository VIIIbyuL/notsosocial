import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type FormEvent, useState } from "react";

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
      This page is going to have a displayer and a maker functionality component
      after.
      <div>{postId}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="contents"> Enter your comment: </label>
        <input
          type="text"
          id="contents"
          name="contents"
          value={contents}
          onChange={(e) => {
            e.preventDefault();
            setContents(e.target.value);
          }}
          className="text-black"
          required
        ></input>

        <button className="button" type="submit">
          submit
        </button>

        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            router.push("/").catch(console.log);
          }}
        >
          Go Back Home
        </button>
      </form>
    </div>
  );
}
