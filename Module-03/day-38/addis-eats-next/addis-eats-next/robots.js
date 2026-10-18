export default function robots() {
  const baseUrl = "https://addis-eats-demo.vercel.app"; // Update with your Vercel URL later
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/orders", "/kitchen"], // Hide private routes from crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}