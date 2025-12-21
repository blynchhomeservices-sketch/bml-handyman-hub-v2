export default function HomePage() {
  return (
    <main style={{ maxWidth: 700, margin: "60px auto", textAlign: "center" }}>
      <h1>BML Handyman Hub</h1>
      <p>Connect customers with trusted contractors.</p>

      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 30 }}>
        <a
          href="/request-service"
          style={{
            padding: "12px 18px",
            border: "1px solid #000",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Request a Service
        </a>

        <a
          href="/join-contractor"
          style={{
            padding: "12px 18px",
            border: "1px solid #000",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Join as Contractor
        </a>
      </div>
    </main>
  );
}
