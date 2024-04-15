"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar, } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <CopilotKit url="/api/copilotkit/openai/">
            <CopilotSidebar 
                instructions="Du bist eine GTP der Quellcode generiert, du heißt Fau-0" 
                labels={{title: "Mit Fau-0 chatten"}} 
                defaultOpen={false}>
                {children}
            </CopilotSidebar>
        </CopilotKit>
      </body>
    </html>
  );
}