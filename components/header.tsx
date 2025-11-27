"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container w-full mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-light.png"
              alt="logo"
              width={40}
              height={40}
              className="flex dark:hidden"
            />
            <Image
              src="/logo-dark.png"
              alt="logo"
              width={40}
              height={40}
              className="dark:flex hidden"
            />
            <span className="text-xl font-semibold">Clean Formatter</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/feature-guide"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>

          <Button asChild size="sm">
            <Link href="/tools">Explore Tools</Link>
          </Button>
          <ThemeToggle />
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/feature-guide"
                className="text-sm font-medium hover:text-primary"
                onClick={handleLinkClick}
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-primary"
                onClick={handleLinkClick}
              >
                Blog
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium hover:text-primary"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Button
                asChild
                size="sm"
                className="mt-2"
                onClick={handleLinkClick}
              >
                <Link href="/tools">Explore Tools</Link>
              </Button>
              <div className="mt-2">
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
