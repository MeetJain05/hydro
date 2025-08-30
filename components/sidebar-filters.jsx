"use client"

export default function SidebarFilters({ state, setState, onSuggest }) {
  // Color system (3-5 colors):
  // - Primary: emerald-600
  // - Accents: blue-600 (plants), orange-600 (demand)
  // - Neutrals: white, slate/foreground
  return (
    <aside className="w-full md:w-64 border-r bg-background">
      <div className="p-4 space-y-6">
        <section>
          <h2 className="font-semibold mb-3">Layers</h2>
          <div className="space-y-2">
            <Toggle
              id="layer-plants"
              label="Existing plants"
              checked={state.layers.plants}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, plants: v } }))}
              color="text-blue-600"
            />
            <Toggle
              id="layer-storage"
              label="Storage"
              checked={state.layers.storage}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, storage: v } }))}
            />
            <Toggle
              id="layer-pipelines"
              label="Pipelines"
              checked={state.layers.pipelines}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, pipelines: v } }))}
            />
            <Toggle
              id="layer-hubs"
              label="Distribution hubs"
              checked={state.layers.hubs}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, hubs: v } }))}
            />
            <Toggle
              id="layer-renewables"
              label="Renewable energy (solar/wind)"
              checked={state.layers.renewables}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, renewables: v } }))}
              color="text-emerald-600"
            />
            <Toggle
              id="layer-demand"
              label="Demand centers"
              checked={state.layers.demand}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, demand: v } }))}
              color="text-orange-600"
            />
            <Toggle
              id="layer-routes"
              label="Transport routes"
              checked={state.layers.routes}
              onChange={(v) => setState((prev) => ({ ...prev, layers: { ...prev.layers, routes: v } }))}
            />
          </div>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Filters</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="state" className="text-sm text-muted-foreground block mb-1">
                State
              </label>
              <select
                id="state"
                className="w-full border rounded-md px-2 py-1.5 bg-background"
                value={state.filters.state}
                onChange={(e) => setState((prev) => ({ ...prev, filters: { ...prev.filters, state: e.target.value } }))}
              >
                <option value="Gujarat">Gujarat</option>
                <option value="India" disabled>
                  India (coming soon)
                </option>
                <option value="World" disabled>
                  World (coming later)
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="region" className="text-sm text-muted-foreground block mb-1">
                Region
              </label>
              <select
                id="region"
                className="w-full border rounded-md px-2 py-1.5 bg-background"
                value={state.filters.region}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, filters: { ...prev.filters, region: e.target.value } }))
                }
              >
                <option value="All">All</option>
                <option value="Kutch">Kutch</option>
                <option value="Saurashtra">Saurashtra</option>
                <option value="Central">Central</option>
                <option value="South">South</option>
                <option value="North">North</option>
              </select>
            </div>
            <div>
              <label htmlFor="proximity" className="text-sm text-muted-foreground block mb-1">
                Proximity range (km)
              </label>
              <input
                id="proximity"
                type="range"
                min={0}
                max={300}
                value={state.filters.proximity}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, filters: { ...prev.filters, proximity: Number(e.target.value) } }))
                }
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-1">{state.filters.proximity} km</div>
            </div>
          </div>
        </section>

        <button
          onClick={onSuggest}
          className="w-full rounded-md bg-emerald-600 text-white px-3 py-2 text-sm hover:bg-emerald-700"
        >
          Suggest Best Sites
        </button>
      </div>
    </aside>
  )
}

function Toggle({ id, label, checked, onChange, color = "text-foreground" }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={`text-sm ${color}`}>{label}</span>
    </label>
  )
}
