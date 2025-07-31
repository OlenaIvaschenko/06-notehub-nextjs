import { NewNoteData, Note } from "@/types/note";
import axios from "axios";
// import type { NewNoteData, Note } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  search?: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
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
    `https://notehub-public.goit.study/api/notes?perPage=12&sortBy=created`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response.data);
  

  return response.data;
};

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    newNote,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};