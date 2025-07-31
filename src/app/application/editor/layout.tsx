import type { Metadata } from "next";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`antialiased`}>{children}</div>;
}
