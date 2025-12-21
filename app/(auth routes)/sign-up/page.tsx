"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";

const SignUpPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload: { email: string; password: string } = { email, password };

    register(payload)
      .then(() => {
        router.push("/profile");
      })
      .catch(() => {
        setError("Registration failed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={css.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={css.input}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
