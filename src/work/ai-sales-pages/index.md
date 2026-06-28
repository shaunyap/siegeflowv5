---

path: "/work/ai-sales-pages"
date: "2026-06-28"
title: "AI-Powered Sales Pages"
subheader: "Automating targeted account-based marketing pages from Slack using multi-agent workflows."
thumbnail: "./thumbnail.png"
tags: [Next.js, Contentful, Vercel, Slack API, AI Agents, Gemini]
team: {
    webdev: ["[Shaun Yap](https://www.shaunyap.com)"],
    creative: "Brand & Design Team"
}

---

##### The Goal
## Hyper-personalized landing pages in minutes, not weeks

Account-Based Marketing (ABM) is incredibly effective, but it faces a significant scaling bottleneck. For our sales team to win high-value accounts, they need bespoke landing pages that speak directly to a target company’s unique business challenges and digital goals. 

Historically, creating a single targeted landing page was a multi-week ordeal. It required a sales representative to research the prospect, a copywriter to draft tailored messaging, a designer to mock up the page, and a web developer to build and deploy it in Contentful. Our goal was to build a system that compressed this entire cycle down to a few minutes, putting page generation directly in the hands of the sales team while maintaining strict brand and architectural standards.

##### Strategy
## Separation of concerns: research vs. generation

In building an automated system, we knew that human-in-the-loop validation was critical. We decided to split the workflow into two distinct phases to ensure the final landing page was both accurate and highly relevant:

1. **Information Synthesis**: Before generating a page, the sales rep inputs an AI prompt targeting the prospect. The AI scans public sources—recent financial statements, public filings, and interviews—to synthesize the target company's current challenges and identify exactly where Amperity's products can help.
2. **Review & Refinement**: The sales rep reviews, edits, and refines this research summary. This keeps the information accurate and ensures the salesperson has complete control over the strategic angle before triggering the page build.

Once the research is vetted, the second phase—automated generation—begins.

##### Execution
## Orchestrating a multi-agent AI pipeline

To make the generation process as frictionless as possible, we built the frontend interface as a simple **Slackbot**. To the sales rep, the complexity is entirely hidden: they send a single slash command to the Slackbot with the approved research, and wait.

Under the hood, a sophisticated multi-agent pipeline takes over:

```mermaid
graph TD
    User["Sales Representative"] -->|1. Submit Research| Slack["Slackbot"]
    Slack -->|2. Trigger Build| Vercel["Vercel Serverless Function"]
    subgraph AI Pipeline (Vercel)
        Vercel --> Agent1["Agent 1: Brand Copywriter"]
        Agent1 -->|Brand-Aligned Copy| Agent2["Agent 2: Frontend Layout Architect"]
    end
    Agent2 -->|3. Populate Entries| Contentful["Contentful Management API"]
    Contentful -->|4. Generate Staging & Preview Links| Slack
    Slack -->|5. Deliver Links| User
```

#### 1. The Vercel Serverless Orchestrator
The Slackbot sends the payload to a Vercel cloud server, which coordinates the AI agents and API integrations.

#### 2. Agent 1: The Brand Voice Copywriter
The first AI agent is trained extensively on our brand voice, messaging framework, and product positioning guidelines. It ingests the raw research summary and translates it into high-converting headlines, body copy, and value propositions tailored to the prospect.

#### 3. Agent 2: The Frontend Layout Architect
This agent is trained on our Next.js component library and content modules. It receives the brand copy and decides how to lay out the page. By mapping content to our existing set of responsive Contentful modules, it selects the best blocks (e.g., hero banner, feature grids, customer testimonials) and tweaks parameters to fit the narrative flow.

#### 4. The Contentful API Hand-Off
Once the layout is structured, the pipeline calls the **Contentful Management API** to programmatically generate the entry, link the nested reference modules, and populate the copy. 

##### Impact
## From weeks to clicks

Once the pipeline completes, the Slackbot pings the sales rep with:
- A link to the draft entry in Contentful (allowing them to manually add custom marketing graphics).
- A staging preview link to review the rendered Next.js page.
- The final production URL once they click publish in Contentful.

By automating the copywriting, structure, and CMS entry creation, we reduced the time it takes to spin up a personalized ABM landing page from **several weeks of cross-team coordination to under two minutes**. This empowers our sales team to move fast, personalize at scale, while keeping our web development resources focused on core platform engineering.
