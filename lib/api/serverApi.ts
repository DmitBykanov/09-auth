import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const createServerApi = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    headers: {
      Cookie: allCookies,
      "Content-Type": "application/json",
    },
  });
};

export const fetchNotes = async (): Promise<Note[]> => {
  const api = await createServerApi();
  const { data } = await api.get<Note[]>("/notes");
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = await createServerApi();
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const api = await createServerApi();
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const api = await createServerApi();
  const { data } = await api.get<User | null>("/auth/session");
  return data;
};
