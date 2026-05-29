// TODO: Implementeer topscorer-selectie
// Haal data op via /api/predictions/topscorers
export function TopscorersSection() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Topscorer Advies</h2>
      <p className="text-slate-400 text-sm">
        AI selecteert 6 topscorers gewogen naar Scorito-puntenwaarde.
        Verdedigers/keepers leveren 32 punten per goal!
      </p>
    </div>
  );
}
