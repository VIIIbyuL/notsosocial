import { type Like } from "@prisma/client";
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
    <div className="flex w-screen flex-col-reverse items-center gap-5 text-center">
      {postData.map((item, index) => (
        <div key={index}>
          {item.author ? <h3>{item.author.name}</h3> : <h3>No Author</h3>}
          <p>{item.contents}</p>
          <div>{item.id}</div>
          {/* Format and render the creationDate as a string */}
          <p>
            {item.creationDate
              ? new Date(item.creationDate).toLocaleString()
              : ""}
          </p>

          {/* Render likes if available */}
          {item.likes && (
            <ul>
              {/* {item.likes.map((like, likeIndex) => (
                <li key={likeIndex}>{item.likes.author}</li>
                
              ))} */}
              {item.likes.length}
            </ul>
          )}

          {/* Render comments if available */}
          {item.comments && (
            <ul>
              {item.comments.map((comment, commentIndex) => (
                <li key={commentIndex}>{/* Render comment details here */}</li>
              ))}
            </ul>
          )}

          <ul className="flex gap-2">
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
                className="button"
                onClick={() => {
                  router.push(`/ViewLike/${item.id}`).catch(console.log);
                }}
              >
                View Likes
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}