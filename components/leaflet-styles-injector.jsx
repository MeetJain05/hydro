"use client"
import { useEffect } from "react"

export default function LeafletStylesInjector() {
  useEffect(() => {
    const id = "leaflet-css-cdn"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    link.crossOrigin = ""
    document.head.appendChild(link)
    return () => {
      // Keep CSS for navigation; do not remove on unmount
    }
  }, [])
  return null
}
