import { useState } from "react";

export function Header() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="app-header">
      <div className="header-brand">
        {/* WK 2026 officieel logo */}
        {!logoError ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3b/2026_FIFA_World_Cup_logo.svg"
            alt="FIFA World Cup 2026"
            className="header-logo"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="header-logo-fallback">🏆</div>
        )}
        <div className="header-title">
          <h1>WK 2026</h1>
          <p>AI Voorspeller</p>
        </div>
      </div>
      <div className="header-badge">AI Live</div>
    </header>
  );
}
