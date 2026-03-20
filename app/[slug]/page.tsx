// app/[slug]/page.tsx
import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";

// URLs fix karne ka function
function fixWordPressUrls(content: string): string {
  if (!content) return content;
  return content.replace(/:10003\/wp-content/g, 'http://localhost:10003/wp-content');
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const { data } = await client.query({
      query: gql`
        query GetPage($slug: ID!) {
          page(id: $slug, idType: URI) {
            id
            title
            content
          }
        }
      `,
      variables: { slug: slug },
    });

    if (!data?.page) {
      return (
        <div style={styles.notFound}>
          <h1 style={styles.notFoundTitle}>404</h1>
          <p style={styles.notFoundText}>Page not found</p>
          <a href="/" style={styles.notFoundButton}>Back to Home</a>
        </div>
      );
    }

    const fixedContent = fixWordPressUrls(data.page.content);

    return (
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>🍎</span>
              <span style={styles.logoText}>fruitblog</span>
            </div>
            
            {/* Mobile Menu Button - Simple */}
            <button style={styles.mobileMenuButton} aria-label="Menu">☰</button>
            
            {/* Navigation */}
            <nav style={styles.nav}>
              <a href="/" style={styles.navLink}>Home</a>
              <a href="/new-page" style={{...styles.navLink, ...styles.navLinkActive}}>New Page</a>
              <a href="/about-page" style={styles.navLink}>About</a>
              <a href="/contact-page" style={styles.navLink}>Contact</a>
            </nav>
          </div>
        </header>

        {/* Page Title */}
        <div style={styles.pageHeader}>
          <div style={styles.pageHeaderInner}>
            <h1 style={styles.pageTitle}>{data.page.title}</h1>
          </div>
        </div>

        {/* Main Content */}
        <main style={styles.main}>
          <article style={styles.article}>
            <div 
              dangerouslySetInnerHTML={{ __html: fixedContent }}
              style={styles.content}
            />
          </article>
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerGrid}>
              <div style={styles.footerCol}>
                <h3 style={styles.footerHeading}>🍎 fruitblog</h3>
                <p style={styles.footerText}>Fresh fruits, fresh perspectives.</p>
              </div>
              <div style={styles.footerCol}>
                <h3 style={styles.footerHeading}>Quick Links</h3>
                <ul style={styles.footerList}>
                  <li style={styles.footerItem}><a href="/" style={styles.footerLink}>Home</a></li>
                  <li style={styles.footerItem}><a href="/new-page" style={styles.footerLink}>New Page</a></li>
                  <li style={styles.footerItem}><a href="/about-page" style={styles.footerLink}>About</a></li>
                  <li style={styles.footerItem}><a href="/contact-page" style={styles.footerLink}>Contact</a></li>
                </ul>
              </div>
              <div style={styles.footerCol}>
                <h3 style={styles.footerHeading}>Connect</h3>
                <ul style={styles.footerList}>
                  <li style={styles.footerItem}><a href="#" style={styles.footerLink}>Twitter</a></li>
                  <li style={styles.footerItem}><a href="#" style={styles.footerLink}>Instagram</a></li>
                  <li style={styles.footerItem}><a href="#" style={styles.footerLink}>Facebook</a></li>
                </ul>
              </div>
            </div>
            <div style={styles.footerBottom}>
              <p style={styles.copyright}>© 2026 FruitBlog. All rights reserved. Made with 🍎</p>
            </div>
          </div>
        </footer>
      </div>
    );

  } catch (error: any) {
    return (
      <div style={styles.error}>
        <p style={styles.errorText}>Error loading page</p>
        <a href="/" style={styles.errorButton}>Go Home</a>
      </div>
    );
  }
}

// 🎨 Attractive, Responsive Styles - No Horizontal Scroll
const styles = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#ffffff",
    width: "100%",
    overflowX: "hidden" as const, // ✅ No horizontal scroll
  },

  // Header - Clean & Professional
  header: {
    backgroundColor: "#0a2a1a", // Deeper green
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    width: "100%",
  },
  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoIcon: {
    fontSize: "2rem",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.5px",
  },
  mobileMenuButton: {
    display: "none", // Hidden by default, show on mobile via media query
    background: "none",
    border: "none",
    color: "white",
    fontSize: "2rem",
    cursor: "pointer",
    padding: "0.5rem",
  },
  nav: {
    display: "flex",
    gap: "2rem",
    "@media (max-width: 768px)": {
      display: "none", // Hide on mobile, would need JS toggle
    },
  },
  navLink: {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.5rem 0",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    ":hover": {
      color: "#ffffff",
      borderBottom: "2px solid #ffd700",
    },
  },
  navLinkActive: {
    color: "#ffffff",
    borderBottom: "2px solid #ffd700",
  },

  // Page Header - Elegant
  pageHeader: {
    backgroundColor: "#f5f9f5",
    borderBottom: "1px solid #e0e8e0",
    width: "100%",
  },
  pageHeaderInner: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "4rem 2rem",
    textAlign: "center" as const,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  pageTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)", // Responsive font
    fontWeight: "700",
    color: "#0a2a1a",
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },

  // Main Content - Perfect Typography
  main: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "4rem 2rem",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  article: {
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  content: {
    fontSize: "1.125rem",
    lineHeight: 1.8,
    color: "#2a3a2a",
    width: "100%",
    overflowX: "hidden" as const,
    
    // WordPress content styling
    "& h2": {
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      fontWeight: "700",
      color: "#0a2a1a",
      marginTop: "3rem",
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: "2px solid #e0e8e0",
    },
    "& h3": {
      fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
      fontWeight: "600",
      color: "#0a2a1a",
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    "& p": {
      marginBottom: "1.5rem",
      color: "#2a3a2a",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      margin: "2rem 0",
      display: "block",
    },
    "& blockquote": {
      margin: "2rem 0",
      padding: "1.5rem 2rem",
      backgroundColor: "#f5f9f5",
      borderLeft: "4px solid #0a2a1a",
      fontStyle: "italic",
      color: "#1a3a1a",
      borderRadius: "0 8px 8px 0",
    },
    "& ul, & ol": {
      marginBottom: "1.5rem",
      paddingLeft: "1.5rem",
    },
    "& li": {
      marginBottom: "0.5rem",
    },
    "& .wp-block-button": {
      display: "inline-block",
      backgroundColor: "#0a2a1a",
      color: "#ffffff",
      padding: "0.75rem 2rem",
      textDecoration: "none",
      borderRadius: "50px", // Pill shape
      fontWeight: "500",
      margin: "1rem 0",
      transition: "all 0.2s ease",
      border: "none",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#1a3a1a",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(10,42,26,0.2)",
      },
    },
    "& .wp-block-columns": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      margin: "2rem 0",
      width: "100%",
    },
    "& .wp-block-column": {
      padding: "1.5rem",
      backgroundColor: "#f5f9f5",
      borderRadius: "12px",
    },
  },

  // Footer - Modern & Clean
  footer: {
    backgroundColor: "#0a1a0a",
    color: "#ffffff",
    borderTop: "1px solid #1a3a1a",
    width: "100%",
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem 2rem",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "3rem",
    marginBottom: "3rem",
    width: "100%",
  },
  footerCol: {
    display: "flex",
    flexDirection: "column" as const,
  },
  footerHeading: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    color: "#ffffff",
    letterSpacing: "0.5px",
  },
  footerText: {
    fontSize: "0.95rem",
    color: "#a0b0a0",
    lineHeight: 1.6,
    margin: 0,
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerItem: {
    marginBottom: "0.75rem",
  },
  footerLink: {
    color: "#a0b0a0",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.2s ease",
    ":hover": {
      color: "#ffffff",
    },
  },
  footerBottom: {
    borderTop: "1px solid #1a3a1a",
    paddingTop: "2rem",
    textAlign: "center" as const,
  },
  copyright: {
    fontSize: "0.9rem",
    color: "#708070",
    margin: 0,
  },

  // Not Found Page
  notFound: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: "2rem",
    textAlign: "center" as const,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  notFoundTitle: {
    fontSize: "clamp(4rem, 10vw, 6rem)",
    fontWeight: "700",
    color: "#0a2a1a",
    marginBottom: "1rem",
    lineHeight: 1,
  },
  notFoundText: {
    fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
    color: "#4a5a4a",
    marginBottom: "2rem",
  },
  notFoundButton: {
    backgroundColor: "#0a2a1a",
    color: "#ffffff",
    padding: "0.75rem 2rem",
    textDecoration: "none",
    borderRadius: "50px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#1a3a1a",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(10,42,26,0.2)",
    },
  },

  // Error
  error: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff5f5",
    padding: "2rem",
    textAlign: "center" as const,
    width: "100%",
    boxSizing: "border-box" as const,
  },
  errorText: {
    fontSize: "1.2rem",
    color: "#dc2626",
    marginBottom: "1.5rem",
  },
  errorButton: {
    backgroundColor: "#0a2a1a",
    color: "#ffffff",
    padding: "0.75rem 2rem",
    textDecoration: "none",
    borderRadius: "50px",
    transition: "all 0.2s ease",
  },
};

// Add responsive styles via CSS classes
const responsiveStyles = `
  @media (max-width: 768px) {
    .header-inner {
      padding: 1rem;
    }
    .nav {
      gap: 1rem;
    }
    .nav a {
      font-size: 0.9rem;
    }
    .footer-grid {
      gap: 2rem;
    }
    .page-header-inner {
      padding: 3rem 1rem;
    }
    .main {
      padding: 2rem 1rem;
    }
    .article {
      padding: 0;
    }
  }

  @media (max-width: 480px) {
    .header-inner {
      flex-wrap: wrap;
    }
    .logo {
      margin-bottom: 0.5rem;
    }
    .nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      width: 100%;
    }
    .footer-grid {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .footer-col {
      align-items: center;
    }
  }

  /* Ensure no horizontal scroll on any device */
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = responsiveStyles;
  document.head.appendChild(style);
}