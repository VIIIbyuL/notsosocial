// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import DisplayPosts from "~/components/DisplayPosts";
// import { type Like } from "@prisma/client";

// type PostResult = {
//   contents: string | null;
//   creationDate: Date | null; // Update the type to Date
//   author?: string | null;
//   likes?: Like[] | null;
//   comments?: Comment[] | null;
// };

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPop, setShowPop] = useState(true);
  const { data: postData = [], error } = api.post.getAll.useQuery();

  if (error) {
    return <div>SOMETHING WHEN WRONG FETCHING POSTS</div>;
  }

  if (status === "loading") {
    return <div>CURRENTLY LOADING...</div>;
  }

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center justify-center ">
        <ul className="rounded-md bg-slate-400 p-20">
          <li className="mb-10 ">Please sign in before proceeding :)</li>
          <li className="flex w-auto justify-center text-center">
            <button
              className="button"
              onClick={() => {
                signIn("discord").catch(console.log);
              }}
            >
              Sign in here with discord.
            </button>
          </li>
        </ul>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="flex w-screen items-center justify-center pb-5 pt-5 text-center">
          NOT SO SOCIAL?
        </div>
        <nav className="mb-10 flex w-screen items-center justify-center">
          <ul>
            <li>
              <button
                onClick={() => {
                  router.push("/CreatePost").catch(console.log);
                }}
                className="button"
              >
                {" "}
                make a post
              </button>
            </li>
          </ul>
        </nav>

        {showPop && (
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-slate-500 p-16">
            <div>Welcome {session.user.name} !</div>
            <div className="mt-5 flex items-center justify-center text-center">
              <button
                onClick={() => {
                  setShowPop(false);
                }}
              >
                got it
              </button>
            </div>
          </div>
        )}

        {/* Post loader component here? */}
        <DisplayPosts postData={postData} />

        <ul className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <li>
            <button
              className="button"
              onClick={() => {
                signOut().catch(console.log);
              }}
            >
              Sign out
            </button>
          </li>

          <li>
            <button
              className="button"
              onClick={() => {
                router.push("/Profile").catch(console.log);
              }}
            >
              View Your Profile
            </button>
          </li>

          <li>
            <button
              className="button"
              onClick={() => {
                router.push("/SearchProfile").catch(console.log);
              }}
            >
              Searching For Someone?
            </button>
          </li>
        </ul>
      </>
    );
  }
}
