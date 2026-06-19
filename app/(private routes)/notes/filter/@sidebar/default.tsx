import Link from "next/link";
import css from "./SidebarNotes.module.css";
export default async function NotesSidebar() {
  const Tags = ["Todo", "Work", "Shopping", "Meeting", "Personal"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all`}
          className={css.menuLink}>
          All notes
        </Link>
      </li>
      {Tags.map((Tag) => {
        return (
          <li
            className={css.menuItem}
            key={Tag}>
            <Link
              href={`/notes/filter/${Tag}`}
              className={css.menuLink}>
              {Tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
