import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/health-app/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pulsetrack.vercel.app"
  ),
  title: "PulseTrack — Health & Fitness Monitoring",
  description:
    "Track your daily activity, workouts, sleep, heart rate, BMI and vital health metrics in one beautiful dashboard.",
  keywords: [
    "health",
    "fitness",
    "activity tracker",
    "heart rate",
    "sleep tracking",
    "workout log",
    "BMI calculator",
    "wellness dashboard",
  ],
  authors: [{ name: "PulseTrack" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "PulseTrack — Health & Fitness Monitoring",
    description:
      "Track your daily activity, workouts, sleep, heart rate, BMI and vital health metrics in one beautiful dashboard.",
    siteName: "PulseTrack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseTrack",
    description: "Track your health and fitness in real time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
