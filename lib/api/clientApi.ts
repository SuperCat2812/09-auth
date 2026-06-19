import { Note, NoteValue, TagValue } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export interface Notes {
  notes: Note[];
  totalPages: number;
}

export interface NoteParams {
  page?: number;
  search?: string;
  tag?: TagValue;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface UserData {
  email: string;
  password: string;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
  perPage,
  sortBy,
}: NoteParams): Promise<Notes> => {
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
  });

  return data;
};

export const addNote = async (noteData: NoteValue): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);

  return data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
};

export const registerUser = async (userData: UserData): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", userData);
  return data;
};
export const loginUser = async (userData: UserData): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", userData);
  return data;
};

export const checkServerSession = async (): Promise<boolean> => {
  try {
    const res = await api.get("/auth/session");

    return Boolean(res.data?.authenticated);
  } catch {
    return false;
  }
};
export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export type UpdateUserRequest = {
  username: string;
};
export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>("/users/me", payload);
  return res.data;
};
