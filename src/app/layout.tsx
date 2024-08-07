import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


const gotham = localFont({
  src: [
    {
      path: '/fonts/gotham-black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/gotham-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/gotham-book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gotham-light.woff2',
      weight: '300',
      style: 'normal',
    },
  ]
})

export const metadata: Metadata = {
  title: "Smart Fit - Challenge",
  description: "A challenge for frontend developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gotham.className}>{children}</body>
    </html>
  );
}
