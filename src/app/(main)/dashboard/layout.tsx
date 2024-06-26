import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css"


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Notty",
  description: "Test",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${inter.className}`} >

        {children}
        </body>
    </html>
  );
}
