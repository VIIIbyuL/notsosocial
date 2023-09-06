import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import DisplayPosts from "~/pages/DisplayPosts";
// import { type Like } from "@prisma/client";

// type PostResult = {
//   contents: string | null;
//   creationDate: Date | null; // Update the type to Date
//   author?: string | null;
//   likes?: Like[] | null;
//   comments?: Comment[] | null;
// };

function hasPopupBeenShown() {
  return localStorage.getItem("popupShown") === "true";
}

function handleLogout() {
  localStorage.removeItem("popupShown"); // Clear the flag from localStorage
  signOut().catch(console.log); // Then, log the user out
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPop, setShowPop] = useState(true);
  const { data: postData = [], error } = api.post.getAll.useQuery();

  if (error) {
    return <div>Oops! Something went wrong. Please try again later.</div>;
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
        <div className="flex w-screen items-center justify-center pt-5 text-center text-white">
          NOT SO SOCIAL?
        </div>
        <nav className="mb-8 mt-2 flex w-screen items-center justify-center">
          <ul>
            <li>
              <button
                onClick={() => {
                  router.push("/CreatePost").catch(console.log);
                }}
                className="button"
              >
                Post
              </button>
            </li>
          </ul>
        </nav>

        {!hasPopupBeenShown() && showPop && (
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-slate-700 p-10 text-white">
            <div>Welcome {session.user.name}!</div>
            <div className="mt-5 flex items-center justify-center text-center">
              <button
                onClick={() => {
                  setShowPop(false);
                  // Set the flag in localStorage to indicate that the popup has been shown.
                  localStorage.setItem("popupShown", "true");
                }}
                className="button"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center p-5">
          <div className="flex w-[430px] items-center justify-center rounded-lg bg-slate-700 p-10">
            <div className="h-[500px] overflow-y-auto overflow-x-hidden">
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

        <ul className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <li>
            <button
              className="button"
              onClick={() => {
                handleLogout();
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
              Profile
            </button>
          </li>

          <li>
            <button
              className="button"
              onClick={() => {
                router.push("/SearchProfile").catch(console.log);
              }}
            >
              Search
            </button>
          </li>
        </ul>
      </>
    );
  }
}
