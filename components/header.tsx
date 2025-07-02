"use client";
import { useRouter } from "next/navigation";
import { Logo } from "./logo"; // <-- Logo component path
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import toast from "react-hot-toast";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0D0D0D]/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-5">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            {session?.user?.email && (
              <Link
                href="/dashboard"
                className="hidden sm:inline-block text-gray-300 hover:text-white font-medium transition duration-300"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => scrollToSection("pricing")}
              className="hidden sm:inline-block text-gray-300 hover:text-white font-medium transition duration-300"
            >
              Pricing
            </button>
            {session?.user?.name ? (
              <Button
                variant="ghost"
                className="border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition font-medium"
                onClick={() => {
                  signOut({ callbackUrl: process.env.CALLBACK_URL_AFTER_SIGN_OUT });
                  toast.success("LogOut Successful");
                }}
              >
                Log Out
              </Button>
            ) : (
              <Link
                href="/sign-in"
                className="whitespace-nowrap bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition px-5 py-2 rounded-full text-sm font-semibold shadow-md"
              >
                Sign in
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="block sm:hidden rounded-full p-2 border border-gray-700 bg-[#1A1A1A] hover:bg-[#2a2a2a] transition"
                >
                  <Menu className="h-5 w-5 text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#0D0D0D] text-gray-200 w-64 p-0">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-gray-800">
                    <Logo />
                  </div>
                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto">
                    <nav className="px-6 py-4 space-y-3">
                      {session?.user?.email && (
                        <Link
                          href="/dashboard"
                          className="block text-sm font-semibold text-gray-300 hover:bg-[#1C1C1C] rounded-lg px-4 py-2 transition"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => scrollToSection("pricing")}
                        className="block text-sm font-semibold text-gray-300 hover:bg-[#1C1C1C] rounded-lg px-4 py-2 transition"
                      >
                        Pricing
                      </button>
                    </nav>
                  </div>
                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                      © {new Date().getFullYear()}{" "}
                      <span className="text-xl font-extrabold bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
        WHISPRSYNC
      </span>
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
