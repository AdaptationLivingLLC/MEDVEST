"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const caseTypes = {
  en: [
    { value: "", label: "Select case type..." },
    { value: "msa-administration", label: "MSA Administration" },
    { value: "lien-resolution", label: "Lien Resolution" },
    { value: "settlement-consulting", label: "Settlement Consulting" },
    { value: "trust-services", label: "Trust Services" },
    { value: "liability-settlements", label: "Liability Settlements" },
    { value: "other", label: "Other / Not Sure" },
  ],
  es: [
    { value: "", label: "Seleccione tipo de caso..." },
    { value: "msa-administration", label: "Administración MSA" },
    { value: "lien-resolution", label: "Resolución de Gravámenes" },
    { value: "settlement-consulting", label: "Consultoría de Acuerdos" },
    { value: "trust-services", label: "Servicios de Fideicomiso" },
    { value: "liability-settlements", label: "Acuerdos de Responsabilidad Civil" },
    { value: "other", label: "Otro / No estoy seguro" },
  ],
};

const labels = {
  en: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    caseType: "Case Type",
    message: "Tell us about your situation",
    submit: "Send Message",
    submitting: "Sending...",
    success: "Thank you. We will contact you within one business day.",
    error: "Something went wrong. Please try again or call us directly.",
    validEmail: "Please enter a valid email address.",
  },
  es: {
    name: "Nombre Completo",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    caseType: "Tipo de Caso",
    message: "Cuéntenos sobre su situación",
    submit: "Enviar Mensaje",
    submitting: "Enviando...",
    success: "Gracias. Nos comunicaremos con usted dentro de un día hábil.",
    error: "Algo salió mal. Inténtelo de nuevo o llámenos directamente.",
    validEmail: "Por favor ingrese un correo electrónico válido.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const locale = useLocale();
  const isEs = locale === "es";
  const l = isEs ? labels.es : labels.en;
  const types = isEs ? caseTypes.es : caseTypes.en;

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "invalid"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const caseType = String(formData.get("caseType") ?? "");
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "");

    if (!name || !EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          caseType,
          message,
          locale,
          website,
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-cream-400 rounded-card text-brown-900 placeholder:text-brown-300 focus:outline-none focus:ring-2 focus:ring-copper focus:border-copper transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brown-900 mb-1.5">
          {l.name} *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className={inputClasses}
          placeholder={l.name}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brown-900 mb-1.5">
            {l.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClasses}
            placeholder={l.email}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brown-900 mb-1.5">
            {l.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={32}
            autoComplete="tel"
            className={inputClasses}
            placeholder={l.phone}
          />
        </div>
      </div>

      <div>
        <label htmlFor="caseType" className="block text-sm font-semibold text-brown-900 mb-1.5">
          {l.caseType}
        </label>
        <select id="caseType" name="caseType" className={inputClasses}>
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brown-900 mb-1.5">
          {l.message} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          className={inputClasses}
          placeholder={l.message}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center font-semibold rounded-button px-8 py-4 text-lg bg-brown-900 text-cream-100 hover:bg-brown-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? l.submitting : l.submit}
      </button>

      {status === "success" && (
        <p
          role="status"
          className="text-green-700 bg-green-50 border border-green-200 rounded-card p-4 text-sm text-center"
        >
          {l.success}
        </p>
      )}

      {status === "invalid" && (
        <p
          role="alert"
          className="text-red-700 bg-red-50 border border-red-200 rounded-card p-4 text-sm text-center"
        >
          {l.validEmail}
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="text-red-700 bg-red-50 border border-red-200 rounded-card p-4 text-sm text-center"
        >
          {l.error}
        </p>
      )}
    </form>
  );
}
