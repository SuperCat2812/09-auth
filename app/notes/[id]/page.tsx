import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: note.title,
    description: `Details of Note ${note.title}`,
    openGraph: {
      title: note.title,
      description: `Details of Note ${note.title}`,
      url: `https://08-zustand-ruddy-two.vercel.app/notes/${note.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1mlqxp9*_gcl_au*NTc5NjMyMzM4LjE3Nzg5NDA5OTk.*_ga*MTIyMjk4MTE4NS4xNzc4ODQzNzA0*_ga_PW0T7S5LDQ*czE3ODE1MzAwMjQkbzEyNiRnMCR0MTc4MTUzMDAzMSRqNTMkbDAkaDA.",
        },
      ],
    },
  };
};
export default async function DetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
