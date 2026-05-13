import { AuthProvider } from "@/contexts/AuthContext";
import NextThemeProvider from "@/contexts/ThemeProvider";
import "./globals.css";
import { Inter, Geist } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IFConnected - A Rede Social do IF",
  description:
    "Conectando os campi do Instituto Federal. Compartilhe experiências, encontre oportunidades e construa sua rede.",
  keywords: ["IF", "Instituto Federal", "rede social", "educação", "campus"],
  authors: [{ name: "IFConnected" }],
  openGraph: {
    title: "IFConnected - A Rede Social do IF",
    description: "Conectando os campi da Paraíba e do Brasil.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className={`${inter.className} antialiased`}>
        <GoogleOAuthProvider clientId="541656136687-dj7v9udsuodhv8okd4a74n9rkfhfcvda.apps.googleusercontent.com">
          <NextThemeProvider>
            <TooltipProvider delayDuration={100}>
              <AuthProvider>{children}</AuthProvider>
            </TooltipProvider>
          </NextThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
