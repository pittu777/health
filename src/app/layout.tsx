import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { getCurrentSession } from "@/lib/auth";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Shop",
  description: "Shop modern products with smart filters, cart management, and dynamic product pages.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, shouldRefreshTokens } = await getCurrentSession();

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ReduxProvider
          initialUser={user}
          shouldRefreshSession={shouldRefreshTokens}
        >
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
