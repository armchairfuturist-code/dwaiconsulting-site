import Link from "next/link";

const rows = [
  { label: "Under 200 workers", value: 2575, width: 100, tone: "is-small" },
  { label: "200+ workers", value: 1538, width: 59.7, tone: "is-large" },
];

export function CostGap() {
  return (
    <section className="data-section grain" aria-labelledby="cost-shift-heading">
      <div className="shell">
        <div className="data-head">
          
          <h2 id="cost-shift-heading">The premium is not where the pressure lands.</h2>
          <p className="data-deck">Most owners track the renewal number. The number their people feel is the deductible, and for smaller employers it is far larger.</p>
        </div>

        <figure className="data-figure">
          <table className="gap-table">
            <caption className="sr-only">Average annual deductible for single coverage at firms under 200 workers compared with firms of 200 or more workers, 2024</caption>
            <thead>
              <tr>
                <th scope="col">Firm size</th>
                <th scope="col">Average single deductible</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>
                    <span className="gap-cell">
                      <span className={`bar ${row.tone}`} aria-hidden="true" data-bar>
                        <i style={{ width: row.width + "%" }} />
                      </span>
                      <b>${row.value.toLocaleString("en-US")}</b>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="gap-delta">
            <strong>+67%</strong>
            <span>higher average deductible at firms under 200 workers.</span>
          </div>
          <figcaption>Source: KFF 2024 Employer Health Benefits Survey, 2,142 firms. Covered workers with a general annual deductible.</figcaption>
        </figure>

        <div className="stat-strip">
          <div className="stat">
            <b>$1,787</b>
            <span>Average single deductible across all covered workers.</span>
          </div>
          <div className="stat">
            <b>32%</b>
            <span>Of covered workers at smaller firms face a $3,000 or higher single deductible.</span>
          </div>
          <div className="stat">
            <b>$25,572</b>
            <span>Average family premium in 2024, up 7% for a second straight year.</span>
          </div>
        </div>

        <p className="data-foot"><Link className="text-link" href="/blog">Read the benefits insights</Link></p>
      </div>
    </section>
  );
}
