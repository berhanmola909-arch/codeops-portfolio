import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <h1>Addis Eats</h1>
      <p>Habesha food, ordered in a minute.</p>
      <Link href="/menu" className="cta">See the Menu</Link>
    </main>
  );
}