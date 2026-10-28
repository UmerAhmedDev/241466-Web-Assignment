# E-Commerce Inventory and Stock Management Dashboard

Name: Umer Ahmed
Registration ID: 241466

## How to run

    npm install
    npm run dev

## CSR vs SSR

In CSR, which a Vite and React app uses, the server sends an almost empty HTML page and a big JavaScript file. The browser downloads the JavaScript, runs it, and builds the page on the user's device. So the first screen shows only after the JavaScript is ready. The server does very little work because it only sends static files.

In SSR, which Next.js uses, the server runs React for every request and builds the full HTML page. The browser gets a page that already has content, so it shows quickly. Then React loads in the browser and makes the page work. This step is called hydration. So the server does real work for every visitor.

For performance, CSR has a slower first load, especially on weak phones or slow internet, because the user waits for JavaScript. After that, moving between pages is fast and smooth. SSR shows the first screen faster, but a busy server can slow down the response.

For SEO, search engines read the ready HTML of an SSR page easily. A CSR page is harder to read because the content appears only after JavaScript runs. For an online store, good SEO matters because shoppers find products through search.

For hosting, CSR is cheap and simple because any static host or CDN can serve it. SSR needs a running server, which costs more and is harder to scale.

Our inventory dashboard is a private page for staff, so SEO does not matter and CSR is a good choice. A public product store would fit SSR better.
