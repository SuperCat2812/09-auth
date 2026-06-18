"use client";
import Loading from "@/app/loading";
import ErrorRoute from "@/app/notes/error";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  return (
    <>
      {data && (
        <Modal onClose={router.back}>
          <NoteDetailsClient note={data} />
        </Modal>
      )}
      {isLoading && <Loading />} {error && <ErrorRoute error={error} />}
    </>
  );
}
