import { useRouter } from "next/router";
import { useState } from "react";
import { type FormEvent } from "react";
import { api } from "~/utils/api";
import DisplaySearch from "~/pages/DisplaySearch";

type SearchResult = {
  id: string | null;
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
  
  };

  return (
    <div>
      <div className="text-align mb-5 mt-5 flex w-screen items-center justify-center">
        <button
          className="button bg-slate-700 text-white"
          onClick={(e) => {
            e.preventDefault();
            router.push("/").catch(console.log);
          }}
        >
          Home
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 text-center"
      >
        <div>
          <label htmlFor="name" className="mr-5 text-white">
            {" "}
            Input Name:{" "}
          </label>
          <input
            className="mr-5 rounded border bg-slate-700 p-2 text-white"
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
          <button type="submit" className="button bg-slate-700 text-white">
            Search
          </button>
        </div>
      </form>

      <div className="flex justify-center p-5">
        <div className="flex w-[430px] items-center justify-center rounded-lg bg-slate-700 p-10">
          <div className="h-[500px] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col items-center justify-center">
              <DisplaySearch searchData={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
