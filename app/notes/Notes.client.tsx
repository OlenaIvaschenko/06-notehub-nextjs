"use client";

import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, NoteResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  startData: NoteResponse;
};

export default function NoteClient({ startData }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debounceQuery] = useDebounce(query, 1000);

  const updateQuery = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, page],
    queryFn: () => fetchNotes(debounceQuery, page),
    initialData: startData,
    refetchOnMount: false,

    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={updateQuery} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} total={data.totalPages} onChange={setPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <span>Loading...</span>}
      {isError && <span className={css.error}>Error</span>}
      {isSuccess && <NoteList notes={data ? data.notes : []} />}
    </div>
  );
}
