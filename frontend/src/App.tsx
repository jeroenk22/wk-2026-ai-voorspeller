import { useState } from "react";
import { ChampionSection } from "./components/champion/ChampionSection";
import { GroupsSection } from "./components/groups/GroupsSection";
import { Header } from "./components/ui/Header";
import { TopscorersSection } from "./components/topscorers/TopscorersSection";

type Tab = "groups" | "topscorers" | "champion";

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("groups");

  return (
    <div className="app-shell">
      <Header />

      {/* Tab navigatie */}
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === "groups" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("groups")}
        >
          ⚽ Poules
        </button>
        <button
          className={`tab-btn ${activeTab === "topscorers" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("topscorers")}
        >
          🥇 Topscorers
        </button>
        <button
          className={`tab-btn ${activeTab === "champion" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("champion")}
        >
          🏆 Kampioen
        </button>
      </nav>

      {/* Content */}
      <main className="main-content">
        {activeTab === "groups" && <GroupsSection />}
        {activeTab === "topscorers" && <TopscorersSection />}
        {activeTab === "champion" && <ChampionSection />}
      </main>
    </div>
  );
}
