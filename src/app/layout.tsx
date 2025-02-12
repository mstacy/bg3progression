import type { Metadata } from "next";
import { Alegreya } from "next/font/google";
import "./globals.css";

const AlegreyaSerif = Alegreya({
    variable: "--font-alegreya",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BG3 Progression",
    description:
        "Track quests, items, and interactions in Baldur's Gate 3 so you do miss anything",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${AlegreyaSerif.variable}`}>{children}</body>
        </html>
    );
}
