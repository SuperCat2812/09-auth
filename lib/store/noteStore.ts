import { Note } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftForm {
  title: string;
  content: string;
  tag: Note["tag"];
}
interface CreateNote {
  draft: DraftForm;
  setDraft: (notes: DraftForm) => void;
  clearDraft: () => void;
}
const initialDraft: DraftForm = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useCreateNote = create<CreateNote>()(
  persist(
    (setNote) => ({
      draft: initialDraft,
      setDraft: (value) => setNote({ draft: value }),
      clearDraft: () => setNote({ draft: initialDraft }),
    }),
    { name: "note-draft" },
  ),
);
