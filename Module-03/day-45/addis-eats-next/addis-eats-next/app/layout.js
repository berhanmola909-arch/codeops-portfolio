import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { getSession } from "@/lib/session";
import { signOut } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://addis-eats-demo.vercel.app"), // Update with your Vercel URL later
  title: {
    default: "Addis Eats | Habesha Food",
    template: "%s | Addis Eats",
  },
  description: "Order authentic Habesha food in minutes.",
  openGraph: {
    title: "Addis Eats",
    description: "Order authentic Habesha food in minutes.",
    url: "/",
    siteName: "Addis Eats",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="site-header">
          <Link href="/" className="site-title">
            Addis Eats
          </Link>

          <nav className="site-nav">
            <Link href="/menu" className="site-link">Menu</Link>

            {user && (
              <>
                <Link href="/checkout" className="site-link">Checkout</Link>
                <Link href="/orders" className="site-link">Orders</Link>
              </>
            )}

            {user?.role === "staff" && (
              <Link href="/kitchen" className="site-link">
                Kitchen
              </Link>
            )}

            {user ? (
              <>
                <span className="site-user">Hi, {user.name}</span>
                <form action={signOut} className="inline-form">
                  <button type="submit" className="site-link">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link href="/signin" className="site-link">Sign in</Link>
            )}
          </nav>
        </header>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}