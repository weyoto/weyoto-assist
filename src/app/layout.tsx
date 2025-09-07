import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/Provider/QueryProvider";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export const metadata: Metadata = {
  title: "Weyoto Assist",
  description: "AI powered support for businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable}  antialiased`}>
        {" "}
        <QueryProvider>
          <Toaster />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
