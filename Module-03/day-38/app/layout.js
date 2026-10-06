import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Habesha food, ordered in a minute",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="site-title">Addis Eats</a>
          <a href="/menu" className="site-link">Menu</a>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}