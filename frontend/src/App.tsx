import { useState } from "react";
import { ChampionSection } from "./components/champion/ChampionSection";
import { GroupsSection } from "./components/groups/GroupsSection";
import { Header } from "./components/ui/Header";
import { TopscorersSection } from "./components/topscorers/TopscorersSection";
import "./styles/index.css";

type Tab = "groups" | "topscorers" | "champion";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "groups",      label: "Poules",      icon: "⚽" },
  { id: "topscorers",  label: "Topscorers",  icon: "🥇" },
  { id: "champion",    label: "Kampioen",    icon: "🏆" },
];

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("groups");

  return (
    <div className="app-shell">
      <Header />

      <nav className="tab-nav">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`tab-btn ${activeTab === id ? "tab-btn--active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === "groups"     && <GroupsSection />}
        {activeTab === "topscorers" && <TopscorersSection />}
        {activeTab === "champion"   && <ChampionSection />}
      </main>
    </div>
  );
}
