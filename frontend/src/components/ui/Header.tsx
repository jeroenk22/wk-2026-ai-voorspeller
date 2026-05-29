export function Header() {
  return (
    <header className="flex items-center gap-4 px-4 py-3 bg-[var(--color-wk-darker)] border-b border-[var(--color-wk-border)]">
      {/* WK 2026 logo placeholder */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <div>
          <h1 className="font-display text-xl text-[var(--color-wk-gold)] leading-none">
            WK 2026
          </h1>
          <p className="text-xs text-slate-400 leading-none">AI Voorspeller</p>
        </div>
      </div>
    </header>
  );
}
