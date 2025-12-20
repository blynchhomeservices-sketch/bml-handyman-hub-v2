"use client";

import { useState } from "react";

export default function RequestServicePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>Request a Service</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}

