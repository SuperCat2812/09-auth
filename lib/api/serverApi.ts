import { Note } from "@/types/note";
import { api } from "./api";
import { NoteParams, Notes } from "./clientApi";
import { cookies } from "next/headers";
import { User } from "@/types/user";
export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async ({
  page,
  search,
  tag,
  perPage,
  sortBy,
}: NoteParams): Promise<Notes> => {
  const cookieStore = await cookies();
  const params = search
    ? {
        page,
        search,
        tag,
        perPage,
        sortBy,
      }
    : {
        page,
        tag,
        perPage,
        sortBy,
      };

  const { data } = await api.get<Notes>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
export const getMe = async () => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
