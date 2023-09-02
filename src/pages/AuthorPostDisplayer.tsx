import { api } from "~/utils/api";
import DisplayPosts from "~/pages/DisplayPosts";

export default function AuthorPostDisplayer() {
  const { data: postData = [], error } = api.post.viewPosts.useQuery();

  if (error) {
    return <div>SOMETHING WHEN WRONG FETCHING POSTS</div>;
  }

  return (
    <div className="flex justify-center p-5">
      <div className="flex w-[430px] items-center justify-center rounded-lg bg-slate-700 p-10">
        <div className="h-[400px] overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col items-center justify-center">
            {/* Center the content */}
            {postData.length !== 0 ? (
              <DisplayPosts postData={postData} />
            ) : (
              <div className="text-white">No Posts Yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
