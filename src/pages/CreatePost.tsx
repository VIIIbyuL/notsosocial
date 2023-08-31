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
    router.push("/").catch(console.log);
  };

  return (
    <>
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
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 text-center"
      >
        <div>
          <label htmlFor="contents" className="mr-5 text-white">
            {" "}
            What u saying?{" "}
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
          <button type="submit" className="button bg-slate-700 text-white">
            Post
          </button>
        </div>
      </form>
    </>
  );
}
