"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import { divIcon, point } from "leaflet"
import "leaflet/dist/leaflet.css"
import { GUJARAT_CENTER, DEFAULT_ZOOM } from "@/data/infrastructure"

// Dynamic import to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false })

// Custom simple colored marker via divIcon to avoid image assets issues
function dot(color = "#2563eb") {
  return divIcon({
    html: `<span style="display:inline-block;width:12px;height:12px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2)"></span>`,
    className: "",
    iconSize: point(16, 16, true),
  })
}

const COLORS = {
  plant: "#3b82f6", // blue
  renewable: "#16a34a", // green
  demand: "#ea580c", // orange
  storage: "#0ea5e9", // sky
  pipeline: "#64748b", // slate
  hub: "#111827", // black-ish
  rec: "#f59e0b", // amber/gold for recommendations
}

export default function LeafletMap({
  visible = {
    plants: true,
    renewables: true,
    demand: true,
    storage: false,
    pipelines: false,
    hubs: false,
    recs: false,
  },
  items = { plants: [], renewables: [], demand: [], storage: [], pipelines: [], hubs: [], recs: [] },
}) {
  const icons = useMemo(
    () => ({
      plant: dot(COLORS.plant),
      renewable: dot(COLORS.renewable),
      demand: dot(COLORS.demand),
      storage: dot(COLORS.storage),
      pipeline: dot(COLORS.pipeline),
      hub: dot(COLORS.hub),
      rec: divIcon({
        html: `
        <span title="Recommended site" style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:9999px;background:${COLORS.rec};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2)">
          ★
        </span>`,
        className: "",
        iconSize: point(24, 24, true),
      }),
    }),
    [],
  )

  return (
    <div className="w-full h-full rounded-md overflow-hidden border">
      <MapContainer center={GUJARAT_CENTER} zoom={DEFAULT_ZOOM} className="w-full h-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visible.plants &&
          items.plants.map((p) => (
            <Marker key={p.id} position={p.position} icon={icons.plant}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Plant · Region: {p.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.storage &&
          items.storage.map((s) => (
            <Marker key={s.id} position={s.position} icon={icons.storage}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Storage · Region: {s.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.pipelines &&
          items.pipelines.map((pl) => (
            <Marker key={pl.id} position={pl.position} icon={icons.pipeline}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{pl.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Pipeline (MVP point) · Region: {pl.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.hubs &&
          items.hubs.map((h) => (
            <Marker key={h.id} position={h.position} icon={icons.hub}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{h.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Distribution Hub · Region: {h.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.renewables &&
          items.renewables.map((r) => (
            <Marker key={r.id} position={r.position} icon={icons.renewable}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Renewable · Region: {r.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.demand &&
          items.demand.map((d) => (
            <Marker key={d.id} position={d.position} icon={icons.demand}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">Type: Demand Center · Region: {d.region}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {visible.recs &&
          items.recs.map((r) => (
            <Marker key={r.id} position={r.position} icon={icons.rec}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">
                    {r.name} · Score {r.score}
                  </div>
                  <div className="text-xs text-muted-foreground">{r.reason}</div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}
