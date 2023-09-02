import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import AuthorPostDisplayer from "./AuthorPostDisplayer";

export default function Profile() {
  const { data: session, status } = useSession();
  const { data: profileData, isLoading } = api.profile.viewProfile.useQuery();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  if (isLoading) {
    return <div>Loading profile data...</div>;
  }

  // Assuming profileData contains the user's profile information
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mt-10 flex w-[350px] max-w-md flex-col items-center justify-center space-y-4 rounded-lg bg-slate-600 p-5 text-white shadow-md">
        <h1 className="text-3xl font-semibold">Your Profile</h1>
        <p className="text-lg">
          Username: {profileData?.name ?? "none available"}
        </p>
        <p className="text-lg">
          Email: {profileData?.email ?? "none available"}
        </p>
        {/* Render other profile information */}
        <div className="flex items-center justify-center text-center ">
          <button
            onClick={() => {
              router.push("/").catch(console.log);
            }}
            className="button mr-3"
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push("/ProfileEdit").catch(console.log);
            }}
            className="button"
          >
            Edit
          </button>
        </div>
      </div>

      <AuthorPostDisplayer />
    </div>
  );
}
