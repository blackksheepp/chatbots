import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

const nighty = localFont({
  src: "./fonts/Nighty.otf",
  variable: "--font-nighty",
})

export const metadata: Metadata = {
  title: "Pieza",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
        rel="stylesheet"
        type="text/css"
        precedence="default"
      />
      <body
        className={`${caveat.variable} ${nighty.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
