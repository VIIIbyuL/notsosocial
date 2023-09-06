import { api } from "~/utils/api";
import { useState } from "react";

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
      console.log("Profile followed:", data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleFollow = (followId: string | null) => {
    if (followId) {
      followMutation.mutate({
        userIdToFollow: followId,
      });
    }
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
                item.id && handleFollow(item.id);
              }}
              className="button flex w-full justify-center"
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
