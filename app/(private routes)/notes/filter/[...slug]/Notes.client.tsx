"use client";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";
import { TagValue } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  tag: TagValue | undefined;
}
export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const updateQuery = useDebouncedCallback((query) => {
    setQuery(query);
    setPage(1);
  }, 300);

  const { data } = useQuery({
    queryKey: ["note", { page, query, tag }],
    queryFn: () => fetchNotes({ page, search: query, tag }),
    enabled: true,
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPage = data?.totalPages || 1;
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            query={query}
            updateQuery={updateQuery}
          />
          <Link
            className={css.button}
            href={"/notes/action/create"}>
            Create
          </Link>
        </header>
        {totalPage > 1 && (
          <Pagination
            handlePageClick={handleChangePage}
            pageCount={totalPage}
            currentPage={page}
          />
        )}

        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}
