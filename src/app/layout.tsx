import type { Metadata, Viewport } from "next";
import { Poppins, Raleway, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ProgressProvider } from "@/lib/progress";
import { ThemeProvider } from "@/lib/theme";

// Runs before paint so a returning dark-mode user never sees a light flash.
const noFlashTheme = `(function(){try{if(localStorage.getItem('thai-buddy-theme')==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["700"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thai Buddy — learn Thai the fun way",
  description: "Gamified Thai language learning with pictures, levels, and friends.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${raleway.variable} ${notoThai.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>{children}</ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
