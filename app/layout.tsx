import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "App to save,change,delete,... . Note elements",
  openGraph: {
    title: "NoteHub",
    description: "App to save,change,delete,... . Note elements",
    url: "https://08-zustand-ruddy-two.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg?_gl=1*1mlqxp9*_gcl_au*NTc5NjMyMzM4LjE3Nzg5NDA5OTk.*_ga*MTIyMjk4MTE4NS4xNzc4ODQzNzA0*_ga_PW0T7S5LDQ*czE3ODE1MzAwMjQkbzEyNiRnMCR0MTc4MTUzMDAzMSRqNTMkbDAkaDA.",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} `}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
