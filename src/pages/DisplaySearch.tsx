import { api } from "~/utils/api";

type SearchResult = {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
};

export default function DisplaySearch({
  searchData,
}: {
  searchData: SearchResult[];
}) {
  const followMutation = api.profile.followProfile.useMutation({
    onSuccess: (data) => {
      // Handle success, reset fields, etc.

      console.log("Profile followed:", data);
    },
    onError: (error) => {
      // Handle error, display message, etc.
      console.error("Error updating profile:", error);
    },
  });

  const handleFollow = (followId: string) => {
    const addFollow = followMutation.mutate({
      userIdToFollow: followId,
    });

    console.log("Profile followed:", addFollow);
  };

  return (
    <div>
      {searchData.length > 0 ? (
        searchData.map((item, index) => (
          <div
            key={index}
            className="mb-5 w-[350px] max-w-md rounded-lg bg-slate-600 p-5 text-white shadow-md"
          >
            <h3 className="text-xl font-semibold">Username: {item.name}</h3>
            <p className="text-gray-200">Email: {item.email}</p>
            <button
              onClick={() => {
                item.id && handleFollow(item.id); // Check for null before calling handleFollow
              }}
              className="flex w-full justify-center button"
            >
              Follow
            </button>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
