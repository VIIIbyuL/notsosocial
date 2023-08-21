import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

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
    <div>
      <h1>Your Profile</h1>
      <p>Name: {profileData?.name ?? "none available"}</p>
      <p>Email: {profileData?.email ?? "none available"}</p>
      {/* Render other profile information */}
      <button
        className="button"
        onClick={() => {
          router.push("/").catch(console.log);
        }}
      >
        Go Back Home
      </button>
      <button
        className="button"
        onClick={() => {
          router.push("/ProfileEdit").catch(console.log);
        }}
      >
        Edit Your Profile
      </button>
    </div>
  );
}
