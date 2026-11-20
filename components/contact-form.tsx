"use client";

import { useState } from "react";
import { EMPLOYEE_BANDS, RENEWAL_MONTHS, validateContact, type ContactErrors } from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const FALLBACK = "Please email steve@dwaiconsulting.com or call 773-203-6104.";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = validateContact(raw);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: ContactErrors;
      };

      if (response.ok && data.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setMessage(data.message ?? FALLBACK);
    } catch {
      setStatus("error");
      setMessage(`We could not reach the server. ${FALLBACK}`);
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-card contact-done" role="status">
        <p className="eyebrow">Received</p>
        <h3>Thank you. Steve has your details.</h3>
        <p>You will hear back within one business day. If it is urgent, call 773-203-6104.</p>
      </div>
    );
  }

  return (
    <form className="contact-card contact-form" onSubmit={handleSubmit} noValidate>
      <p className="eyebrow">Request a review</p>
      <h3>Tell us what you are working with.</h3>
      <p className="form-note">
        Name, email, employee count and renewal month are enough to start. Have a census ready?{" "}
        <a className="form-download" href="/dwai-intake-checklist.csv" download>
          Download the intake checklist
        </a>.
      </p>

      {status === "error" && message ? (
        <p className="form-status" role="alert">
          {message}
        </p>
      ) : null}

      <div className="form-grid">
        <Field label="Name" name="name" error={errors.name} required autoComplete="name" />
        <Field label="Work email" name="email" error={errors.email} required type="email" autoComplete="email" />
        <Field label="Phone" name="phone" error={errors.phone} type="tel" autoComplete="tel" optional />
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" optional />

        <div className="field">
          <label htmlFor="employees">Employees enrolling <span aria-hidden="true">*</span></label>
          <select id="employees" name="employees" required defaultValue="" aria-invalid={errors.employees ? true : undefined} aria-describedby={errors.employees ? "employees-error" : undefined}>
            <option value="" disabled>Select a range</option>
            {EMPLOYEE_BANDS.map((band) => (
              <option value={band} key={band}>{band}</option>
            ))}
          </select>
          {errors.employees ? <p className="field-error" id="employees-error">{errors.employees}</p> : null}
        </div>

        <div className="field">
          <label htmlFor="renewal">Renewal month <span aria-hidden="true">*</span></label>
          <select id="renewal" name="renewal" required defaultValue="" aria-invalid={errors.renewal ? true : undefined} aria-describedby={errors.renewal ? "renewal-error" : undefined}>
            <option value="" disabled>Select a month</option>
            {RENEWAL_MONTHS.map((month) => (
              <option value={month} key={month}>{month}</option>
            ))}
          </select>
          {errors.renewal ? <p className="field-error" id="renewal-error">{errors.renewal}</p> : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">What would you like to solve?</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={4000}
          aria-invalid={errors.notes ? true : undefined}
          aria-describedby={errors.notes ? "notes-error" : undefined}
        />
        {errors.notes ? <p className="field-error" id="notes-error">{errors.notes}</p> : null}
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="button button-light" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a review"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required = false,
  optional = false,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional ? <span className="field-optional"> optional</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? <p className="field-error" id={`${name}-error`}>{error}</p> : null}
    </div>
  );
}
