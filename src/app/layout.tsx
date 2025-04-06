import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

const varelaRound = localFont({
  src: "../../public/fonts/VarelaRound-Regular.ttf",
  variable: "--font-varela-round",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Roversa Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${varelaRound.variable}`}>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
