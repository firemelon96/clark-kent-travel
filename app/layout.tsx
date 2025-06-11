import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NewNavbar } from "@/components/new-navigation";
import Footer from "./components/footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import ConfirmationDialog from "@/components/confirmation-dialog";

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
    "Clark kent trave and tours offers excursions, primarily around Palawan to local and foreign tourists from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <SessionProvider>
        <body className={`${font.className} bg-[#FAF9F6]`}>
          <Toaster richColors />
          {children}
          <ConfirmationDialog />
        </body>
      </SessionProvider>
    </html>
  );
}
