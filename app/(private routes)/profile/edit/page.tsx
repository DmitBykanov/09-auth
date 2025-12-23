"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";

const EditProfilePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    updateMe({ username }).then(() => {
      router.push("/profile");
    });
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || "https://ac.goit.global/path/to/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
