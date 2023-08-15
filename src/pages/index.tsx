// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  

  if (status === "loading") {
    return <div>CURRENTLY LOADING...</div>;
  }

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center justify-center ">
        <ul className="bg-slate-400 p-20 rounded-md">
          <li className="mb-10 ">Please sign in before proceeding :)</li>
          <li className="flex text-center w-auto justify-center">
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
        <div>Welcome {session.user.name} !</div>
        <button
          className="button"
          onClick={() => {
            signOut().catch(console.log);
          }}
        >
          Sign out here
        </button>
        
        <button
        onClick={() => {
          router.push('/Profile').catch(console.log)
        }}>
          View Your Profile
        </button>
      </>
    );
  }
}
