"use client";
import { useRouter } from "next/navigation";

import css from "./NotePreview.module.css";
import { createPortal } from "react-dom";
interface NotePreviewProps {
  children: React.ReactNode;
}
export default function NotePreview({ children }: NotePreviewProps) {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true">
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
