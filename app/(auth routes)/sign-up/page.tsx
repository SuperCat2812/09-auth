"use client";

import css from "./SignUpPage.module.css";
import { useState } from "react";
import { loginUser, registerUser, UserData } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as UserData;

      await registerUser(formValues);

      await loginUser({
        email: formValues.email,
        password: formValues.password,
      });

      router.push("/profile");
    } catch {
      setIsError(true);
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form
        className={css.form}
        action={handleSubmit}>
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
            Register
          </button>
        </div>

        {isError && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
