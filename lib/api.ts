import { NewNoteData, Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  search?: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const fetchNotes = async (
  query: string,
  page: number
): Promise<NoteResponse> => {
  const params: Params = {
    page,
  };

  if (query) {
    params.search = query;
  }

  const response = await axios.get<NoteResponse>(
    `/notes?perPage=12&sortBy=created`,
    {
      params,
      ...auth,
    }
  );

  // console.log(response.data);

  return response.data;
};

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(`/notes`, newNote, auth);

  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(
    `/notes/${noteId}`,

    auth
  );

  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`, auth);
  return data;
};
