import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Clark kent Travel and Tours ",
    template: "%s | Clark Kent Travel and Tours",
  },
  description:
    "CLARK KENT TRAVEL AND TOURS offers excursions, primarily around Palawan to local and foreign tourists from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${font.className} bg-[#FAF9F6]`}>{children}</body>
    </html>
  );
}
