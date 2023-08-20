/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Like } from "@prisma/client";

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
  return (
    <div className="flex w-screen flex-col-reverse items-center gap-5 text-center">
      {postData.map((item, index) => (
        <div key={index}>
          {item.author ? (
            <h3>{item.author.name}</h3>
          ) : (
            <h3>No Author</h3>
          )}
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
              {item.likes.map((like, likeIndex) => (
                <li key={likeIndex}>{/* Render like details here */}</li>
              ))}
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
          {/* <button>LIKING THIS</button> */}
        </div>
      ))}
      NOT SO SOCIAL
    </div>
  );
}