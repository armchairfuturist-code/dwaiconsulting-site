// Contact form contract shared by the client component and the API route.
// One validator means the browser and the worker cannot disagree about what is valid.

export const EMPLOYEE_BANDS = ["1-9", "10-24", "25-49", "50-99", "100-249", "250+"] as const;

export const RENEWAL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
  "Not sure",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  employees: string;
  renewal: string;
  notes: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactResult =
  | { ok: true; value: ContactInput }
  | { ok: false; errors: ContactErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(raw: unknown): string {
  return typeof raw === "string" ? raw.trim() : "";
}

export function validateContact(raw: unknown): ContactResult {
  const data = (raw ?? {}) as Record<string, unknown>;
  const errors: ContactErrors = {};

  const name = str(data.name);
  const email = str(data.email);
  const phone = str(data.phone);
  const company = str(data.company);
  const employees = str(data.employees);
  const renewal = str(data.renewal);
  const notes = str(data.notes);

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";

  if (phone && phone.replace(/[^0-9]/g, "").length < 7) {
    errors.phone = "Please enter a phone number, or leave it empty.";
  }

  if (!EMPLOYEE_BANDS.includes(employees as (typeof EMPLOYEE_BANDS)[number])) {
    errors.employees = "Please choose how many employees are enrolling.";
  }

  if (!RENEWAL_MONTHS.includes(renewal as (typeof RENEWAL_MONTHS)[number])) {
    errors.renewal = "Please choose your renewal month, or pick Not sure.";
  }

  if (notes.length > 4000) errors.notes = "Please keep this under 4,000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, value: { name, email, phone, company, employees, renewal, notes } };
}
