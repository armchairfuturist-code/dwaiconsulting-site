import { validateContact } from "../../../lib/contact";

// Deliver a lead to Steve's inbox through Resend.
// RESEND_API_KEY is a Worker secret. CONTACT_TO and CONTACT_FROM are plain vars
// (scripts/deploy.sh). Without a key the route fails loudly instead of pretending
// to accept the lead, so a silent black hole is impossible.

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Could not read that submission." }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: a real person never fills the hidden field. Accept quietly.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const parsed = validateContact(body);
  if (!parsed.ok) {
    return Response.json(
      { ok: false, message: "Please check the highlighted fields.", errors: parsed.errors },
      { status: 400 },
    );
  }

  const lead = parsed.value;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "steve@dwaiconsulting.com";
  const from = process.env.CONTACT_FROM ?? "DWAI Website <website@dwaiconsulting.com>";

  if (!apiKey) {
    return Response.json(
      { ok: false, message: "The form is not connected to an inbox yet. Please email or call instead." },
      { status: 503 },
    );
  }

  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "not given"}`,
    `Company: ${lead.company || "not given"}`,
    `Employees enrolling: ${lead.employees}`,
    `Renewal month: ${lead.renewal}`,
    "",
    "Notes:",
    lead.notes || "(none)",
  ];

  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;font:14px system-ui">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone) || "not given"}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(lead.company) || "not given"}</td></tr>
      <tr><td><strong>Employees enrolling</strong></td><td>${escapeHtml(lead.employees)}</td></tr>
      <tr><td><strong>Renewal month</strong></td><td>${escapeHtml(lead.renewal)}</td></tr>
    </table>
    <p><strong>Notes</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(lead.notes) || "(none)"}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `Website enquiry: ${lead.company || lead.name} (${lead.employees} employees)`,
      text: lines.join("\n"),
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("resend failed", response.status, detail);
    return Response.json(
      { ok: false, message: "We could not send that just now. Please email or call instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
