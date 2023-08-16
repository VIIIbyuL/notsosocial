/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { type FormEvent } from "react";
import { api } from "~/utils/api";

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const editProfileMutation = api.profile.editProfile.useMutation({
    onSuccess: (data) => {
      // Handle success, reset fields, etc.
      console.log("Profile updated:", data);
      setName("");
      setEmail("");
      setImage("");
    },
    onError: (error) => {
      // Handle error, display message, etc.
      console.error("Error updating profile:", error);
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageUrl: string = e.target.value;
    setImage(selectedImageUrl);
  };


  const handleSubmit = (event: FormEvent) => {
    console.log("handleSubmit called");
    event.preventDefault();
  
    if (!session) {
      return; // Handle not logged in case
    }
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const profileUpdates = {
      name: trimmedName !== session.user.name ? trimmedName : session.user.name,
      email: trimmedEmail !== session.user.email ? trimmedEmail : session.user.email,
      image: image ?? null,
    };

    if (
      profileUpdates.name === session.user.name &&
      profileUpdates.email === session.user.email &&
      profileUpdates.image === null
    ) {
      // No changes to update
      return;
    }
    console.log("Before editProfileMutation.mutateAsync");
  
    editProfileMutation.mutate({
      name,
      email,
      image,
    });
  
    // No need for try-catch since errors are handled by editProfileMutation
  
    console.log("After editProfileMutation.mutateAsync");
  
    setName("");
    setEmail("");
    setImage("");
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <label htmlFor="image">Image: </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        
        ></input>

        <button type="submit" className="button">
          Save Your Changes
        </button>
      </form>
    </div>
  );
}