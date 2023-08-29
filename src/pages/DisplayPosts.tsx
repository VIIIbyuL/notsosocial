import { type Like } from "@prisma/client";
import { type Comment } from "@prisma/client";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type PostResult = {
  id: string;
  contents: string | null;
  creationDate: Date | null;
  author?: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  } | null;
  likes?: Like[] | null;
  comments?: Comment[] | null;
};

export default function DisplaySearch({
  postData,
}: {
  postData: PostResult[];
}) {
  console.log(postData, postData.length);
  const likePhotoMutation = api.post.likePost.useMutation({
    onSuccess: (data) => {
      console.log("add like has worked", data);
    },
    onError: (err) => {
      console.log("error has occurred", err);
    },
  });

  const handleLike = (postId: string) => {
    likePhotoMutation.mutate({
      postId,
    });
  };

  const router = useRouter();

  return (
    <div className="flex w-screen flex-col-reverse items-center gap-10 text-center">
      {postData.map((item, index) => (
        <div
          className="w-[350px] max-w-md rounded-lg bg-slate-600 p-5 text-white shadow-md"
          key={index}
        >
          {/* Format and render the creationDate as a string */}
          <p className="text-sm text-gray-500">
            {item.creationDate
              ? new Date(item.creationDate).toLocaleString()
              : ""}
          </p>

          <div className="mb-2">
            <p className="text-xl font-semibold">
              {item.author ? `${item.author.name} says` : "No Author says"}{" "}
              {item.contents}
            </p>
          </div>

          <div className="mb-2">
            {item.likes && (
              <p className="text-sm">Likes: {item.likes.length}</p>
            )}
            {item.comments && (
              <p className="text-sm">Comments: {item.comments.length}</p>
            )}
          </div>

          <ul className="flex items-center justify-center gap-2 text-center">
            <li>
              <button
                className="button whitespace-nowrap"
                onClick={() => {
                  router.push(`/ViewLike/${item.id}`).catch(console.log);
                }}
              >
                View Likes
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  handleLike(item.id);
                }}
                className="button"
              >
                Like
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  router.push(`/Comments/${item.id}`).catch(console.log);
                }}
                className="button"
              >
                Comment
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
