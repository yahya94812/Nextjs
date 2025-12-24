# Nextjs

## Rendering Types in Next.js
1. Server-Side Rendering (SSR)
* HTML is generated on every request on the server.

2. Static Site Generation (SSG)
* HTML is generated at build time.

3. Incremental Static Regeneration (ISR)
* A hybrid between SSR and SSG.
* Page is statically generated but updated in the background after a time interval.

4. Client-Side Rendering (CSR)
* Rendering happens in the browser.

## Component-Level Rendering Types in Next.js
5. Server Components (Default)
* Code runs on the server.
* Zero JavaScript is shipped to the browser by default.

6. Client Components
* Marked using "use client".
* Interactive components (forms, modals, dynamic UI).