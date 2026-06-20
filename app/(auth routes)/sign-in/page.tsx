"use client";
import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { loginUser, UserData } from "@/lib/api/clientApi";
import { useUserToken } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useUserToken((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as UserData;

      const user = await loginUser(formValues);

      setUser(user);
      router.push("/profile");
    } catch {
      setError("Oops... some error");
    }
  };
  return (
    <main className={css.mainContent}>
      <form
        className={css.form}
        action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
