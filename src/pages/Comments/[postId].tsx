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
      <form
        className=" flex w-screen flex-col items-center justify-center pt-5  text-center"
        onSubmit={onSubmit}
      >
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

        <div className="mb-7 mt-2 gap-5">
          <button className="button mr-2" type="submit">
            submit
          </button>

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
