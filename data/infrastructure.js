/**
 * Green Hydrogen Mapping Tool – Infrastructure Dataset (Gujarat)
 *
 * Purpose:
 * - Provides mock spatial points for plants, storage, pipelines (as points for MVP), hubs, renewables, demand centers,
 *   and a simple recommendation engine (suggestBestSites).
 * - Consumed by components/leaflet-map.jsx to render colored markers and popups.
 *
 * Visual notes (aligns with green theme tokens from globals.css):
 * - Renewables: primary green emphasis
 * - Other layers: distinct solid colors for clarity (no gradients), maintaining strong contrast
 * - To tweak map colors, adjust COLORS in components/leaflet-map.jsx; this file is data-only.
 */
export const GUJARAT_CENTER = [22.2587, 71.1924]
export const DEFAULT_ZOOM = 7

// Regions are illustrative; feel free to adjust as data evolves.
export const plants = [
  {
    id: "plant-jamnagar",
    name: "Jamnagar Hydrogen Plant",
    type: "plant",
    position: [22.4707, 70.0577],
    region: "Saurashtra",
  },
  {
    id: "plant-vadodara",
    name: "Vadodara Hydrogen Plant",
    type: "plant",
    position: [22.3072, 73.1812],
    region: "Central",
  },
  { id: "plant-surat", name: "Surat Hydrogen Plant", type: "plant", position: [21.1702, 72.8311], region: "South" },
]

export const storage = [
  {
    id: "storage-bharuch",
    name: "Bharuch Storage Facility",
    type: "storage",
    position: [21.7051, 72.9959],
    region: "South",
  },
]

export const pipelines = [
  // Represented as endpoints for MVP markers; later convert to polylines
  {
    id: "pipe-jamnagar-surat",
    name: "Pipeline: Jamnagar → Surat",
    type: "pipeline",
    position: [21.9, 71.5],
    region: "Saurashtra",
  },
]

export const hubs = [
  {
    id: "hub-ahmedabad",
    name: "Ahmedabad Distribution Hub",
    type: "hub",
    position: [23.0225, 72.5714],
    region: "North",
  },
]

export const renewables = [
  { id: "re-bhuj", name: "Bhuj Wind/Solar", type: "renewable", position: [23.241999, 69.666931], region: "Kutch" },
  { id: "re-kutch", name: "Kutch Renewable Cluster", type: "renewable", position: [23.7337, 69.8597], region: "Kutch" },
]

export const demandCenters = [
  { id: "demand-surat", name: "Surat Industrial Zone", type: "demand", position: [21.1702, 72.8311], region: "South" },
  {
    id: "demand-vadodara",
    name: "Vadodara Chemical Cluster",
    type: "demand",
    position: [22.3072, 73.1812],
    region: "Central",
  },
  {
    id: "demand-ahmedabad",
    name: "Ahmedabad Metro Demand",
    type: "demand",
    position: [23.0225, 72.5714],
    region: "North",
  },
]

// Simple mock recommendation engine.
// In the future, replace with backend optimization (FastAPI, etc.)
export function suggestBestSites({ count = 4 } = {}) {
  const pool = [
    {
      id: "rec-jamnagar",
      name: "Jamnagar",
      position: [22.4707, 70.0577],
      score: 92,
      reason: "Proximity to refinery and port; strong infra base.",
    },
    {
      id: "rec-bhuj",
      name: "Bhuj",
      position: [23.241999, 69.666931],
      score: 88,
      reason: "Excellent wind resources; grid access improving.",
    },
    {
      id: "rec-surat",
      name: "Surat",
      position: [21.1702, 72.8311],
      score: 85,
      reason: "High industrial demand and logistics.",
    },
    {
      id: "rec-vadodara",
      name: "Vadodara",
      position: [22.3072, 73.1812],
      score: 83,
      reason: "Chemical industry cluster and skilled workforce.",
    },
    {
      id: "rec-kutch",
      name: "Kutch",
      position: [23.7337, 69.8597],
      score: 80,
      reason: "Strong renewable corridor; land availability.",
    },
  ]
  return pool.slice(0, count)
}
