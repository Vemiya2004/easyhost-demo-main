import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { blogArticles, getArticleBySlug, getAllCategories } from "@/blog/articles";
import { markdownToHtml } from "@/lib/markdown";

export default function BlogPage() {
  const [route, params] = useRoute("/blog/:slug");
  const [article, setArticle] = useState<any>(null);
  const [articleContent, setArticleContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      setLoading(true);
      const art = getArticleBySlug(params.slug);
      if (art) {
        setArticle(art);
        // Fetch and parse the markdown file
        fetch(`/blog/${art.slug}.md`)
          .then((res) => res.text())
          .then((markdown) => {
            // Skip frontmatter and render content
            const parts = markdown.split("---");
            if (parts.length >= 3) {
              const content = parts.slice(2).join("---").trim();
              const html = markdownToHtml(content);
              setArticleContent(html);
            }
          })
          .finally(() => setLoading(false));
      }
    } else {
      setArticle(null);
      setArticleContent("");
      setSelectedCategory("All");
    }
  }, [params?.slug]);

  if (params?.slug && article) {
    return <ArticleView article={article} content={articleContent} loading={loading} />;
  }

  return <BlogListing selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
}

function ArticleView({ article, content, loading }: any) {
  const publishDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 56px)",
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: 18, color: "#111111" }}>
          EasyH
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <a href="/" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            Home
          </a>
          <a href="/public/about-us.html" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            About Us
          </a>
          <a href="/public/blog" style={{ fontSize: 14, fontWeight: 500, color: "#111111" }}>
            Blog
          </a>
          <a href="/public/contact-us.html" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: 60 }}>
        {loading ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#888888" }}>
            Loading article...
          </div>
        ) : (
          <article
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 40px)",
            }}
          >
            {/* Article Header */}
            <div style={{ marginBottom: 40 }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "#999999",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  display: "block",
                }}
              >
                {article.category}
              </span>
              <h1
                style={{
                  fontSize: "clamp(32px, 6vw, 48px)",
                  fontWeight: 700,
                  color: "#111111",
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                {article.title}
              </h1>
              <div style={{ display: "flex", gap: 16, alignItems: "center", color: "#888888" }}>
                <span style={{ fontSize: 14 }}>{article.author}</span>
                <span style={{ fontSize: 14 }}>{publishDate}</span>
              </div>
            </div>

            {/* Article Content */}
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: "#555555",
              }}
            />

            {/* Ad Placeholder */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 60,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f5f5f5",
                  border: "1px dashed #ddd",
                  minHeight: 100,
                  fontSize: 12,
                  color: "#999",
                  fontFamily: "'DM Mono', monospace",
                  maxWidth: 336,
                  height: 280,
                }}
              >
                AD SPACE — Google AdSense Ad Unit (336x280)
              </div>
            </div>

            {/* Related Articles */}
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid #e5e5e5" }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>More Articles</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 20,
                }}
              >
                {blogArticles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 3)
                  .map((relatedArticle) => (
                    <a
                      key={relatedArticle.slug}
                      href={`/blog/${relatedArticle.slug}`}
                      style={{
                        padding: 16,
                        border: "1px solid #e5e5e5",
                        borderRadius: 4,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.25s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as any).style.borderColor = "#111111";
                        (e.currentTarget as any).style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as any).style.borderColor = "#e5e5e5";
                        (e.currentTarget as any).style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: 12, color: "#999999", marginBottom: 8 }}>
                        {relatedArticle.category}
                      </div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                        {relatedArticle.title}
                      </h4>
                      <p style={{ fontSize: 13, color: "#888888", marginBottom: 8 }}>
                        {relatedArticle.description}
                      </p>
                      <div style={{ fontSize: 12, color: "#999999" }}>
                        {new Date(relatedArticle.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "28px clamp(20px, 7vw, 80px)",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          background: "#ffffff",
        }}
      >
        <div style={{ fontSize: 13, color: "#999999" }}>© 2026 EasyH · easyh.space</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/public/about-us.html" style={{ fontSize: 13, color: "#999999" }}>
            About Us
          </a>
          <a href="/public/privacy.html" style={{ fontSize: 13, color: "#999999" }}>
            Privacy Policy
          </a>
          <a href="/public/terms.html" style={{ fontSize: 13, color: "#999999" }}>
            Terms & Conditions
          </a>
          <a href="/public/contact-us.html" style={{ fontSize: 13, color: "#999999" }}>
            Contact
          </a>
          <a href="/public/faq.html" style={{ fontSize: 13, color: "#999999" }}>
            FAQ
          </a>
          <a href="/public/blog" style={{ fontSize: 13, color: "#999999" }}>
            Blog
          </a>
        </div>
      </footer>
    </div>
  );
}

function BlogListing({ selectedCategory, setSelectedCategory }: any) {
  const categories = ["All", ...getAllCategories()];
  const filteredArticles =
    selectedCategory === "All"
      ? blogArticles.filter((a) => a.published)
      : blogArticles.filter((a) => a.published && a.category === selectedCategory);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 5vw, 56px)",
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <a href="/" style={{ fontWeight: 700, fontSize: 18, color: "#111111" }}>
          EasyH
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <a href="/" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            Home
          </a>
          <a href="/public/about-us.html" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            About Us
          </a>
          <a href="/public/blog" style={{ fontSize: 14, fontWeight: 500, color: "#111111" }}>
            Blog
          </a>
          <a href="/public/contact-us.html" style={{ fontSize: 14, fontWeight: 500, color: "#888888" }}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: 60 }}>
        {/* Hero Section */}
        <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 7vw, 80px)", borderBottom: "1px solid #e5e5e5", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#999999",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
              display: "inline-block",
            }}
          >
            Blog
          </span>
          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 64px)",
              fontWeight: 700,
              color: "#111111",
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            Stories About Map Art
          </h1>
          <p style={{ fontSize: 18, color: "#666666", lineHeight: 1.65, maxWidth: 600, margin: "0 auto" }}>
            Explore tips, inspiration, and stories about personalized map art, meaningful gifts, and celebrating the places that matter.
          </p>
        </section>

        {/* Category Filter */}
        <section style={{ padding: "40px clamp(20px, 7vw, 80px)", borderBottom: "1px solid #e5e5e5" }}>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: "10px 16px",
                  border: selectedCategory === category ? "1px solid #111111" : "1px solid #e5e5e5",
                  background: selectedCategory === category ? "#111111" : "#ffffff",
                  color: selectedCategory === category ? "#ffffff" : "#111111",
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section style={{ padding: "60px clamp(20px, 7vw, 80px)" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filteredArticles.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #e5e5e5",
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.borderColor = "#111111";
                  (e.currentTarget as any).style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
                  (e.currentTarget as any).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.borderColor = "#e5e5e5";
                  (e.currentTarget as any).style.boxShadow = "none";
                  (e.currentTarget as any).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: 200,
                    background: "#f0f0f0",
                    backgroundImage: article.image ? `url(${article.image})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: "#999999",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {article.category}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, lineHeight: 1.4, flex: 1 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#888888", lineHeight: 1.6, marginBottom: 12, flex: 1 }}>
                    {article.description}
                  </p>
                  <div style={{ fontSize: 12, color: "#999999" }}>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{ textAlign: "center", color: "#888888", padding: 40 }}>
              No articles found in this category.
            </div>
          )}
        </section>

        {/* Ad placeholder */}
        <section style={{ padding: "40px clamp(20px, 7vw, 80px)", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f5f5f5",
              border: "1px dashed #ddd",
              minHeight: 100,
              fontSize: 12,
              color: "#999",
              fontFamily: "'DM Mono', monospace",
              maxWidth: 336,
              height: 280,
              margin: "0 auto",
            }}
          >
            AD SPACE — Google AdSense Ad Unit (336x280)
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "28px clamp(20px, 7vw, 80px)",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          background: "#ffffff",
        }}
      >
        <div style={{ fontSize: 13, color: "#999999" }}>© 2026 EasyH · easyh.space</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/public/about-us.html" style={{ fontSize: 13, color: "#999999" }}>
            About Us
          </a>
          <a href="/public/privacy.html" style={{ fontSize: 13, color: "#999999" }}>
            Privacy Policy
          </a>
          <a href="/public/terms.html" style={{ fontSize: 13, color: "#999999" }}>
            Terms & Conditions
          </a>
          <a href="/public/contact-us.html" style={{ fontSize: 13, color: "#999999" }}>
            Contact
          </a>
          <a href="/public/faq.html" style={{ fontSize: 13, color: "#999999" }}>
            FAQ
          </a>
          <a href="/public/blog" style={{ fontSize: 13, color: "#999999" }}>
            Blog
          </a>
        </div>
      </footer>
    </div>
  );
}
