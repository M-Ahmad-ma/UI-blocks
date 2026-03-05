import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { ComponentProvider } from "@/Context/ComponentContext";
import { ToastProviderBinder } from "@/components/ui/Toast";
import ErrorBoundary from "./components/ErrorBoundry";
import GlobalError from "@/app/components/Error";

export const metadata: Metadata = {
  title: "UI-blocks | Beautiful UI Components",
  description: "A collection of reusable UI components built with Tailwind CSS, React, and TypeScript",
  keywords: ["UI components", "React", "Tailwind CSS", "shadcn alternative"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ComponentProvider>
          <ErrorBoundary errorComponent={GlobalError}>
            <ToastProviderBinder position="top-right">
              <Header />
              {children}
            </ToastProviderBinder>
          </ErrorBoundary>
        </ComponentProvider>
      </body>
    </html>
  );
}
