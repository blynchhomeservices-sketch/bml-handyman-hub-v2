"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trade: "",
  });

  const [msg, setMsg] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("Submitting...");

    const res = await fetch("/api/contractors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Error");
      return;
    }

    setMsg("✅ Submitted successfully");
    setForm({ name: "", email: "", phone: "", trade: "" });
  }

  return (
    <main style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Join Contractor</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={onChange}
        />
        <input
          name="trade"
          placeholder="Trade"
          value={form.trade}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>

      <p style={{ marginTop: 12 }}>{msg}</p>
    </main>
  );
}
