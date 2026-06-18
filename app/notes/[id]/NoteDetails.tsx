import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";
import { Note } from "@/types/note";

type Props = {
  note: Note;
};
export default function NoteDetailsClientPage({ note }: Props) {
  return <NoteDetailsClient note={note} />;
}
