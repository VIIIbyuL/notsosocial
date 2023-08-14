// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>CURRENTLY LOADING...</div>;
  }

  if (!session) {
    return (
      <>
        <div>Please sign in before proceeding :)</div>
        <button
          onClick={() => {
            signIn("discord").catch(console.log);
          }}
        >
          Sign in here with discord.
        </button>
      </>
    );
  }

  if (session) {
    return (
      <>
        <div>Welcome {session.user.name} !</div>
        <button
          onClick={() => {
            signOut().catch(console.log);
          }}
        >
          Sign out here
        </button>
      </>
    );
  }
}
