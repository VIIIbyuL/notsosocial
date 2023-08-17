// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPop, setShowPop] = useState(true)

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
        {showPop && 
        <div className="fixed left-1/2 rounded-md top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-slate-500 p-16">
          
        <div>Welcome {session.user.name} !</div>
        <div className="mt-5 flex items-center text-center justify-center">
          <button
          onClick={()=>{
            setShowPop(false)
          }}>got it</button>
        </div>
      </div>}

        <ul className="fixed gap-5 bottom-0 w-full flex items-center justify-center">
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
        </ul>
      </>
    );
  }
}
