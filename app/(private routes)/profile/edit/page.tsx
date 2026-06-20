"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useUserToken } from "@/lib/store/authStore";
import { ChangeEvent, FormEvent } from "react";
import { updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function EditPage() {
  const { user, setUser } = useUserToken();
  const router = useRouter();
  const HandlerChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    setUser({ ...user, username: e.target.value });
  };
  const handelSaveSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const updatedUser = await updateMe({
      username: user.username,
    });

    setUser(updatedUser);
    router.back();
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form
          className={css.profileInfo}
          onSubmit={handelSaveSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={user?.username ?? ""}
              onChange={HandlerChangeUserName}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
