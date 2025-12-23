"use client";

import { useState } from "react";

export default function JoinContractorPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trade: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contractors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        trade: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h1>Join as a Contractor</h1>
      <p>Apply to join the BML Handyman Hub contractor network.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="trade"
          placeholder="Primary Trade (e.g. Plumbing, Electrical)"
          value={form.trade}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Tell us about your experience"
          rows={4}
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </button>

        {status === "success" && (
          <p style={{ color: "green" }}>Application submitted successfully.</p>
        )}

        {status === "error" && (
          <p style={{ color: "red" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </main>
  );
}
