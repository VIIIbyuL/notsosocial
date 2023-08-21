import { useRouter } from "next/router";
import { useState } from "react";
import { type FormEvent } from "react";
import { api } from "~/utils/api";
import DisplaySearch from "~/pages/DisplaySearch";

type SearchResult = {
  name: string | null;
  email: string | null;
  image: string | null;
};

export default function SearchProfile() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<SearchResult[]>([]);

  const searchProfileMutation = api.profile.findProfile.useMutation({
    onSuccess: (data) => {
      // Handle success, reset fields, etc.
      setData(data);
      console.log("Profile searched:", data);
      setName("");
    },
    onError: (error) => {
      // Handle error, display message, etc.
      console.error("Error updating profile:", error);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const response = searchProfileMutation.mutate({
      name,
    });

    console.log("Profile searched:", response);
    // Handle the response data as needed
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Input Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
          required
        ></input>

        <button type="submit">Search</button>
      </form>
      <button
        className="button"
        onClick={(e) => {
          e.preventDefault();
          router.push("/").catch(console.log);
        }}
      >
        Go Back Home
      </button>

      {/* render here */}
      {/* DisplaySearch */}
      <DisplaySearch searchData={data} />
    </div>
  );
}
