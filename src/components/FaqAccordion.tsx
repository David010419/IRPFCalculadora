import { FaqEntry } from "@/lib/pensionFaqData";

interface FaqAccordionProps {
  title: string;
  subtitle?: string;
  items: FaqEntry[];
}

export default function FaqAccordion({ title, subtitle, items }: FaqAccordionProps) {
  return (
    <section className="no-print mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, i) => (
          <details key={i} className="group py-3" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-medium leading-snug text-slate-800 marker:content-none">
              <span className="pt-0.5">{item.question}</span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
