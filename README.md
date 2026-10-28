# E-Commerce Inventory and Stock Management Dashboard

Name: Umer Ahmed
Registration ID: 241466

## How to run

    npm install
    npm run dev

## Task 6: Theoretical Analysis: CSR vs. SSR

**Initial load and execution.** In a standard Vite + React app, the server does very little. It hands the browser a nearly empty index.html and a JavaScript bundle, and the browser does everything else: downloading the bundle, running React, fetching data and building the DOM. Until that finishes, the user sees a blank page or a spinner. With SSR in Next.js, the server runs React on each request, fetches the data and sends back finished HTML. The user sees real content almost immediately, though buttons only work after hydration finishes.

**Performance.** CSR pays its cost up front. The first load is slower, especially on weak phones, but after that every filter, search or stock update happens in the browser without asking the server for a new page. SSR gives a faster first paint, but each request uses server time, and a slow database query delays the whole page.

**SEO.** SSR hands crawlers complete HTML, which matters for public storefronts. CSR depends on the crawler running JavaScript, which is less reliable. For this dashboard it barely matters, since inventory pages sit behind a login.

**Hosting.** A CSR build is just static files. Vercel or Netlify can serve them from a CDN for almost nothing, with no server to look after. SSR needs a Node runtime or serverless functions, which means higher cost, more scaling work and more things to break.

**Verdict.** CSR is the sensible choice here. SSR would only make sense if we added public product pages that need to rank in search.
