import { fetchNotes } from "@/lib/api";
import NoteClient from "./Notes.client";

const Notes = async () => {
  const response = await fetchNotes("", 1);

  return <NoteClient startData={response} />;
};

export default Notes;
