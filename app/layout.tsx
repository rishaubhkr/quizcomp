import type { Metadata } from "next";
import { Balsamiq_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const balsamiq_sans = Balsamiq_Sans({
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "QuizComp",
  description: "Create Quizzes with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <body
        className={`${balsamiq_sans.className} antialiased bg-transparent h-screen`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
