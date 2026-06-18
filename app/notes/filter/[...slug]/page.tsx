import mapCategory from "@/lib/utils";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface FilterProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: FilterProps): Promise<Metadata> => {
  const { slug } = await params;
  const category = slug[0];

  const title =
    category === "all"
      ? "All Catalog"
      : category === "Todo"
        ? "Catalog Todo"
        : category === "Work"
          ? "Catalog Work"
          : category === "Shopping"
            ? "Catalog Shopping"
            : category === "Meeting"
              ? "Catalog Meeting"
              : "Catalog Personal";

  return {
    title,
    description: `Notes Page in ${title}`,
    openGraph: {
      title,
      description: `Notes Page in ${title}`,
      url: `https://08-zustand-ruddy-two.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1mlqxp9*_gcl_au*NTc5NjMyMzM4LjE3Nzg5NDA5OTk.*_ga*MTIyMjk4MTE4NS4xNzc4ODQzNzA0*_ga_PW0T7S5LDQ*czE3ODE1MzAwMjQkbzEyNiRnMCR0MTc4MTUzMDAzMSRqNTMkbDAkaDA.",
        },
      ],
    },
  };
};

export default async function Filter({ params }: FilterProps) {
  const { slug } = await params;
  const category = slug[0];
  const param = mapCategory(category);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", param],
    queryFn: () => fetchNotes({ tag: param }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={param} />
    </HydrationBoundary>
  );
}
