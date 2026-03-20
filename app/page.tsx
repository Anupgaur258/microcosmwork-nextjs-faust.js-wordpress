import { gql } from "@apollo/client";
import { getApolloClient } from "../lib/apolloClient";

export default async function Page() {
  const client = getApolloClient();

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            title
            studentform {
              name
              password
              bio
              fruitimage {
                node {
                  id
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    `,
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
      
      {/* HEADER / NAVBAR */}
      <header
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h2 style={{ margin: 0, fontSize: "24px" }}>fruitblog</h2>

        <nav>
          <a href="#" style={navStyle}>Home</a>
          <a href="new-page" style={navStyle}>New Page</a>
          <a href="contact-page" style={navStyle}>Contact</a>
        </nav>
      </header>
 
      {/* HERO SECTION */}
      <section
        style={{
          background: "url('https://images.unsplash.com/photo-1567306226416-28f0efdc88ce') center/cover no-repeat",
          color: "white",
          textAlign: "center",
          padding: "120px 20px",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Welcome to FruitBlog
        </h1>
        <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto" }}>
          Explore posts about fruits, students' bios, and more. Dive in and enjoy colorful content!
        </p>
      </section>

      {/* MAIN CONTENT / POSTS */}
      <main style={{ padding: "20px 40px" }} id="posts">
        <h1 style={{ textAlign: "center", marginBottom: "40px", fontSize: "36px", color: "#2e7d32" }}>All Posts</h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {data.posts.nodes.map((post: any, index: number) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                width: "300px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
              }}
            >
              <h2 style={{ textTransform: "capitalize", color: "#2e7d32" }}>{post.title}</h2>

              <p><strong>Name:</strong> {post.studentform?.name}</p>
              <p><strong>Password:</strong> {post.studentform?.password}</p>
              <p><strong>Bio:</strong> {post.studentform?.bio}</p>

              {post.studentform?.fruitimage?.node?.sourceUrl && (
                <img
                  src={post.studentform.fruitimage.node.sourceUrl}
                  alt={post.studentform.fruitimage.node.altText || "fruit image"}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        id="footer"
        style={{
          backgroundColor: "#2e7d32",
          color: "#fff",
          textAlign: "center",
          padding: "25px 20px",
          marginTop: "60px",
        }}
      >
        <p style={{ margin: 0, fontSize: "16px" }}>© 2026 FruitBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* NAV LINK STYLE */
const navStyle = {
  color: "white",
  marginLeft: "25px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
};


