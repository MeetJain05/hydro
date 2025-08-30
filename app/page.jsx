"use client"

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] bg-background">
      {/* Hero */}
      <section className="relative isolate">
        {/* Background overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/hydrogen-plant-renewable-energy-aerial.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/70">
            Green energy intelligence
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-balance tracking-tight">
            Plan and optimize green hydrogen infrastructure with clarity
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-pretty">
            A map-first decision tool to visualize assets, overlay renewables and demand, and pinpoint the best new
            project sites. Starting with Gujarat, expanding across India and beyond.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/dashboard"
              className="w-full sm:w-auto rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition-colors"
            >
              Launch Demo
            </a>
            <a
              href="/auth"
              className="w-full sm:w-auto rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Login / Sign Up
            </a>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Layer-rich mapping"
            body="Toggle plants, storage, pipelines, hubs, renewables and demand on a fast, focused map built for planners."
          />
          <FeatureCard
            title="Smart site suggestions"
            body="Generate data-backed recommendations for 3–5 new project sites with rationale and proximity context."
          />
          <FeatureCard
            title="Gujarat first, global later"
            body="Start where it matters: regional detail for Gujarat with a roadmap toward India-wide and global coverage."
          />
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ title, body }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 h-1 w-10 rounded-full bg-primary/80" />
    </div>
  )
}
