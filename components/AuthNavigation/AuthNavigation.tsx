"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useUserToken } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
export default function AuthNavigation() {
  const { user, isAuth, clearUser } = useUserToken();
  const router = useRouter();
  console.log(isAuth);
  const handleLogout = async () => {
    await logout();
    clearUser();
    router.push("/sign-in");
  };
  return isAuth ? (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email:{user?.email}</p>
        <button
          className={css.logoutButton}
          onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
