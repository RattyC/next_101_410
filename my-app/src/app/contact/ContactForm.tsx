"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ mode: "onTouched" });

  async function onSubmit(values: FormValues) {
    setSubmitted(null);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted("Thanks! We received your message.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <div>
        <label className="block text-sm mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="w-full rounded border border-black/20 dark:border-white/20 px-3 py-2 bg-transparent"
          placeholder="Jane Doe"
          {...register("name", { required: "Please enter your name." })}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full rounded border border-black/20 dark:border-white/20 px-3 py-2 bg-transparent"
          placeholder="jane@example.com"
          {...register("email", {
            required: "Please enter your email.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email." },
          })}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="message">Message</label>
        <textarea
          id="message"
          className="w-full min-h-[120px] rounded border border-black/20 dark:border-white/20 px-3 py-2 bg-transparent"
          placeholder="How can we help?"
          {...register("message", { required: "Please enter a message." })}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black text-sm disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send"}
      </button>
      {submitted && (
        <p className="text-sm text-gray-700 dark:text-gray-300">{submitted}</p>
      )}
    </form>
  );
}

