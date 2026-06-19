"use client";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/lib/api/clientApi";
import { useCreateNote } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useCreateNote();
  const queryClient = useQueryClient();
  const changeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };
  const { mutate } = useMutation({
    mutationFn: addNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      router.back();
      clearDraft();
    },
  });
  const handlerSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ ...draft });
  };
  return (
    <form
      onSubmit={handlerSubmit}
      className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={changeData}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={changeData}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={changeData}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={router.back}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
