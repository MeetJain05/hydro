"use client"

import Navbar from "@/components/navbar"
import SidebarFilters from "@/components/sidebar-filters"
import ChatSidebar from "@/components/chat-sidebar"
import LeafletMap from "@/components/leaflet-map"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import {
  plants as PLANTS,
  storage as STORAGE,
  pipelines as PIPELINES,
  hubs as HUBS,
  renewables as RENEWABLES,
  demandCenters as DEMAND,
  suggestBestSites,
} from "@/data/infrastructure"

export default function DashboardPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setUser(null)
      setAuthChecked(true)
      return
    }
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u || null)
      setAuthChecked(true)
    })
    return () => unsub && unsub()
  }, [router])

  const [state, setState] = useState({
    layers: {
      plants: true,
      storage: true,
      pipelines: false,
      hubs: true,
      renewables: true,
      demand: true,
      routes: false,
      recs: false,
    },
    filters: { state: "Gujarat", region: "All", proximity: 100 },
    recs: [],
  })

  const filtered = useMemo(() => {
    const region = state.filters.region
    const byRegion = (arr) => (region === "All" ? arr : arr.filter((i) => i.region === region))
    return {
      plants: byRegion(PLANTS),
      storage: byRegion(STORAGE),
      pipelines: byRegion(PIPELINES),
      hubs: byRegion(HUBS),
      renewables: byRegion(RENEWABLES),
      demand: byRegion(DEMAND),
      recs: state.recs,
    }
  }, [state.filters.region, state.recs])

  const onSuggest = () => {
    const recs = suggestBestSites({ count: 5 })
    setState((prev) => ({ ...prev, recs, layers: { ...prev.layers, recs: true } }))
  }

  if (!authChecked) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </main>
    )
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr_22rem] min-h-[calc(100dvh-56px)]">
          {/* Sidebar */}
          <div className="border-r border-border bg-sidebar/50">
            <SidebarFilters state={state} setState={setState} onSuggest={onSuggest} />
          </div>

          {/* Map column */}
          <section className="p-4">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-balance">Gujarat Hydrogen Planning Map</h1>
              <p className="text-sm text-muted-foreground">
                Toggle layers, filter by region, and generate recommended sites.
              </p>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <KPI label="Active layers" value={Object.values(state.layers).filter(Boolean).length} />
              <KPI label="Regions" value="5+" />
              <KPI label="Recs generated" value={state.recs.length} />
            </div>

            {/* Map frame */}
            <div className="h-[70dvh] rounded-xl border border-border bg-card p-1">
              <div className="h-full rounded-lg overflow-hidden">
                <LeafletMap
                  visible={{
                    plants: state.layers.plants,
                    storage: state.layers.storage,
                    pipelines: state.layers.pipelines,
                    hubs: state.layers.hubs,
                    renewables: state.layers.renewables,
                    demand: state.layers.demand,
                    recs: state.layers.recs,
                  }}
                  items={filtered}
                />
              </div>
            </div>
          </section>

          {/* Right rail */}
          <div className="border-l border-border bg-sidebar/50">
            <ChatSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}

function KPI({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="mt-2 h-1 w-8 rounded-full bg-primary/80" />
    </div>
  )
}
