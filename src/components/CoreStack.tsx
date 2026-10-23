import { coreStack } from "../content";

// The recruiter flex row: one loud orange band right under the hero with the
// highest-signal tools as bold bordered chips. Hovering a chip shows the
// real evidence behind it. Deliberately NOT the full skills taxonomy.
export function CoreStack() {
  return (
    <section aria-label="Core stack" className="band-accent">
      <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-8">
        <p className="font-mono text-xs font-bold tracking-widest text-[#17130b]/80">
          <span className="font-black">$</span> cat core_stack.txt
        </p>
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {coreStack.map((tool) => (
            <li key={tool.name} title={tool.note}>
              <span
                className={`chip cursor-help px-4 py-2 text-sm font-extrabold sm:text-base ${
                  tool.secondary ? "opacity-80" : ""
                }`}
              >
                {tool.name}
                {tool.secondary && (
                  <span className="font-mono text-[10px] font-bold opacity-60">(familiar)</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
