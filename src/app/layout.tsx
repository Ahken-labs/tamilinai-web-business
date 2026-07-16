import type { Metadata } from "next";
import { Poppins, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../context/LangContext";
import { ToastProvider } from "../components/ui/Toast";
import BizSessionRestorer from "../components/BizSessionRestorer";
import NoContextMenu from "../components/NoContextMenu";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const notoSansTamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500", "700"], variable: "--font-tamil", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://business.inai.lk"),
  title: {
    default: "Inai Business",
    template: "%s | Inai Business",
  },
  description: "List your wedding business on Inai - reach Tamil families across Sri Lanka and the global diaspora.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${notoSansTamil.variable}`}>
      <body className="select-none">
        <BizSessionRestorer />
        <NoContextMenu />
        <LangProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  );
}
