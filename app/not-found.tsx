// app/not-found.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-foreground p-6">
      <div className="max-w-4xl w-full">
        <div className="backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg overflow-hidden md:flex">
          {/* Illustration / left */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-accent to-accent/70 p-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-light.png"
                alt="logo"
                width={300}
                height={300}
                className="flex dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="logo"
                width={300}
                height={300}
                className="dark:flex hidden"
              />
            </Link>
          </div>

          {/* Content / right */}
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-primary">
              404 — Nothing to format here
            </h1>

            <p className="mt-3 text-muted-foreground">
              Looks like this page wandered into the whitespace. No sweat — you
              can head back to the tools or the homepage.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium bg-accent text-accent-foreground shadow-sm hover:opacity-95"
              >
                Home
              </Link>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium border border-[rgba(11,103,255,0.12)] text-primary-foreground bg-primary hover:bg-primary/70"
              >
                Explore tools
              </Link>
            </div>

            {/* <div className="mt-6 text-muted-foreground">
              <p>
                Tip: Clean Formatter works offline as a PWA — many tools work
                even without a network.
              </p>
            </div> */}

            <div className="mt-6 text-xs text-muted-foreground">
              <em>
                URL:{" "}
                <span className="font-mono text-muted-foreground">
                  {typeof window !== "undefined"
                    ? window.location.pathname
                    : ""}
                </span>
              </em>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--muted-foreground,#6b7280)]">
          Made with ✨ for writers & devs — Clean Formatter
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spinSlow 10s linear infinite;
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
