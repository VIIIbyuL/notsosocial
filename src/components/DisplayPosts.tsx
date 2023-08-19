/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Like } from "@prisma/client";

type PostResult = {
  contents: string | null;
  creationDate: Date | null; // Update the type to Date
  author?: string | null;
  likes?: Like[] | null;
  comments?: Comment[] | null;
};

export default function DisplaySearch({
  postData,
}: {
  postData: PostResult[];
}) {
  return (
    <div>
      display reached
      {postData.map((item, index) => (
        <div key={index}>
          <h3>{item.author}</h3>
          <p>{item.contents}</p>
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
    </div>
  );
}
