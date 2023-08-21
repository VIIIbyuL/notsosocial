import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
// maybe session usage???? but user auth not needed here i dont think

export default function CreatePost() {
  const [contents, setContents] = useState<string>("");
  const router = useRouter();

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: (data) => {
      console.log("post has been created", data);
      //reset the contents after
      setContents("");
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createPostMutation.mutate({
      contents,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Enter your post contents: </label>
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

        <button type="submit" className="button">
          {" "}
          Ready to Post?
        </button>
      </form>
      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          router.push("/").catch(console.log);
        }}
      >
        Go Back Home
      </button>
    </>
  );
}
