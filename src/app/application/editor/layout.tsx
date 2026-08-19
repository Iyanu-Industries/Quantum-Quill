// import "./globals.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`antialiased`}>{children}</div>;
}
