import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GOBLINIFY 👺 | Transform Yourself Into a Goblin",
  description: "Upload your photo and let AI transform you into a wretched little goblin. The internet's favorite goblinification tool.",
  openGraph: {
    title: "GOBLINIFY 👺",
    description: "Transform yourself into a wretched goblin with AI",
    type: "website",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
