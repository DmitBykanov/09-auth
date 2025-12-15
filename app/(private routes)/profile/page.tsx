import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: `Profile`,
  description: `Your Profile`,
  openGraph: {
    title: `Profile`,
    description: `Your Profile`,
    url: `https://notehub.com/profile/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};
