// Single source of truth for project content. The home page renders `featured`
// entries as cards and the rest as compact rows; /projects.html lists all of it.
// Retired work stays commented out in place rather than deleted.

export const projects = [
  {
    slug: "serving-good",
    title: "Serving Good Market Check-In",
    description: "Check-in system a community food market runs on-site during market hours. Members sign up and check in with an SMS code, pick a shopping group, and get a randomized place in line once the window closes. Admin side covers members, schedules, groups, messaging, blacklist, and a QR scanner.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Row-Level Security", "Edge Functions", "Twilio", "Vitest"],
    live: true,
    private: false,
    link: "https://app.servinggood.org/",
    featured: true
  },
  {
    slug: "risen-iq",
    title: "Risen IQ",
    description: "Internal operations platform a freight forwarding company runs day to day. TMS, WMS, KPI dashboards, quote and domestic desks, SOP management, and a PWA for shift turnover. Five user roles, MFA on admin actions, audit logging, and scheduled KPI syncs from their email tooling.",
    tech: ["JavaScript", "Supabase", "PostgreSQL", "Row-Level Security", "Netlify Functions", "PWA", "Anthropic API"],
    live: true,
    private: true,
    link: null,
    featured: true
  },
  {
    slug: "breakledger",
    title: "BreakLedger",
    description: "Ledger app for card-break streamers and the agency that manages them. Tracks purchases, expenses, stream-by-stream profit, and payouts, with a separate workspace per streamer. Inventory is derived from transactions rather than stored, and a nightly job pulls card prices so valuations stay current.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Drizzle ORM", "Cloudflare Workers"],
    live: false,
    private: true,
    link: null,
    featured: true
  },
  {
    slug: "currency-tracker",
    title: "Currency Exchange Rate Tracker",
    description: "Exchange rate tracker with hourly rate ingestion and historical charts.",
    tech: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Redux"],
    live: false,
    private: false,
    link: "https://github.com/teorii/currency-tracker",
    featured: false
  },
  {
    slug: "risen-logistics",
    title: "Risen Logistics",
    description: "Marketing site for a freight forwarding company.",
    tech: ["React", "JavaScript", "CSS", "Web3Forms"],
    live: true,
    private: false,
    link: "https://risencargo.com",
    featured: false
  },
  {
    slug: "dcg",
    title: "DCG",
    description: "Marketing site for a business services company, built on Next.js.",
    tech: ["Next.js", "TypeScript", "React", "Cloudflare", "Netlify"],
    live: true,
    private: false,
    link: "https://dcgpros.com",
    featured: false
  },
  // {
  //   slug: "jessica-metcalf",
  //   title: "Jessica Metcalf Real Estate",
  //   description: "Marketing site for a real estate agent, with listings and lead capture.",
  //   tech: ["WordPress", "PHP", "CSS", "JavaScript"],
  //   live: false,
  //   private: false,
  //   link: "http://jessicasellshomes.com/",
  //   featured: false
  // },
  {
    slug: "poker-bot",
    title: "AI Poker Bot",
    description: "Poker agent that scrapes live game state and plays from heuristics plus an LLM.",
    tech: ["TypeScript", "Node.js", "Puppeteer", "SQLite"],
    live: false,
    private: false,
    link: "https://github.com/teorii/pokernow-gpt",
    featured: false
  }
]

export const featuredProjects = projects.filter((project) => project.featured)
export const otherProjects = projects.filter((project) => !project.featured)
