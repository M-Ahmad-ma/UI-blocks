import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { ComponentProvider } from "@/Context/ComponentContext";
import { ToastProviderBinder } from "@/components/ui/Toast";
import ErrorBoundary from "./components/ErrorBoundry";
import GlobalError from "@/app/components/Error";

export const metadata: Metadata = {
  title: "UI Blocks Gallery",
  description: "No-iframe previews with Next.js + Tailwind + Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="fixed w-full h-screen bg-zinc-950 ">

        <ComponentProvider>
           <ErrorBoundary errorComponent={GlobalError}>

          <ToastProviderBinder position="top-right">
            <Header />
            <div className="bg-background text-primary max-w-9xl w-full">
              {children}
            </div>
          </ToastProviderBinder>
           </ErrorBoundary>
        </ComponentProvider>
      </body>
    </html>
  );
}
