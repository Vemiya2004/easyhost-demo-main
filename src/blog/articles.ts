export interface BlogArticle {
  title: string;
  slug: string;
  date: string;
  author: string;
  description: string;
  image?: string;
  category: string;
  published: boolean;
}

export const blogArticles: BlogArticle[] = [
  {
    title: "Why Personalized Map Art Makes a Meaningful Gift",
    slug: "why-personalized-map-art-meaningful-gift",
    date: "2026-06-01",
    author: "EasyH Team",
    description:
      "Discover why personalized map art is the perfect gift for travelers, couples, and anyone who cherishes meaningful locations.",
    image: "/blog-images/meaningful-gift.jpg",
    category: "Gifting",
    published: true,
  },
  {
    title: "How Custom Map Portraits Capture Special Memories",
    slug: "custom-map-portraits-capture-memories",
    date: "2026-06-02",
    author: "EasyH Team",
    description:
      "Explore how map portraits preserve and celebrate the locations that hold your most precious memories and meaningful moments.",
    image: "/blog-images/special-memories.jpg",
    category: "Memories",
    published: true,
  },
  {
    title: "Choosing the Perfect Location for Your Map Artwork",
    slug: "choosing-perfect-location-map-artwork",
    date: "2026-06-03",
    author: "EasyH Team",
    description:
      "Tips and ideas for selecting the ideal city or location for your custom map portrait to create meaningful, beautiful artwork.",
    image: "/blog-images/perfect-location.jpg",
    category: "Guides",
    published: true,
  },
  {
    title: "Modern Home Decor Ideas Using Custom Maps",
    slug: "modern-home-decor-custom-maps",
    date: "2026-06-04",
    author: "EasyH Team",
    description:
      "Creative ways to display and integrate map portraits into your home decor. From walls to shelves, explore modern design ideas.",
    image: "/blog-images/home-decor.jpg",
    category: "Inspiration",
    published: true,
  },
  {
    title: "The Story Behind Personalized Location Art",
    slug: "story-behind-personalized-location-art",
    date: "2026-06-05",
    author: "EasyH Team",
    description:
      "Explore the origins and evolution of personalized map art, and why this meaningful artistic form resonates with people worldwide.",
    image: "/blog-images/location-art-story.jpg",
    category: "Culture",
    published: true,
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug && article.published);
}

export function getPublishedArticles(): BlogArticle[] {
  return blogArticles.filter((article) => article.published);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter((article) => article.category === category && article.published);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogArticles.map((article) => article.category));
  return Array.from(categories).sort();
}
