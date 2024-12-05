import "@/src/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "../lib/Providers/providers";

import { fontSans } from "@/src/config/fonts";

export const metadata: Metadata = {
  title: "ACME",
  description: "Tech Tips Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
