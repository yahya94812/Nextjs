# Nextjs
# 1: Getting Started
Learn how to create a Next.js application and run your local development server.
* recommended pnpm
* npm install -g pnpm
* npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
* cd nextjs-dashboard
* pnpm run dev
* pnpm run build
* pnpm start //to start the built app in production mode
* /app: Contains all the routes, components, and logic for your application.
* /app/lib: Contains functions used in your application, such as reusable utility functions and data fetching functions.
* /app/ui: Contains all the UI components for your application, such as cards, tables, and forms.
/public: Contains all the static assets for your application, such as images.
* pnpm i
* pnpm dev

# 2: CSS Styling
Let's work on your home page and discuss the different ways you can style your application.
1. How to add a global CSS file to your application.
2. Two different ways of styling: Tailwind and CSS modules.
3. How to conditionally add class names with the clsx utility package.
* clsx lib used to toggle class names

# 3: Optimizing Fonts and Images

Continue working on your home page by adding a hero image and a custom font.
1. How to add custom fonts with next/font.
2. How to add images with next/image.
3. How fonts and images are optimized in Next.js.
* Cumulative Layout Shift is a metric used by Google to evaluate the performance and user experience of a website.
* Files inside /public can be referenced in your application.
* It's good practice to set the width and height of your images to avoid layout shift, these should be an aspect ratio identical to the source image. These values are not the size the image is rendered, but instead the size of the actual image file used to understand the aspect ratio.

# 4: Creating Layouts and Pages

Let's create your dashboard routes using nested layouts and pages!
Let's learn how you can create more routes with layouts and pages.
1. Create the dashboard routes using file-system routing.
2. Understand the role of folders and files when creating new route segments.
3. Create a nested layout that can be shared between multiple dashboard pages.
4. Understand what colocation, partial rendering, and the root layout are.
* You can create separate UIs for each route using layout.tsx and page.tsx files.
* page.tsx is a special Next.js file that exports a React component
* By having a special name for page files, Next.js allows you to colocate UI components, test files, and other related code with your routes. Only the content inside the page file will be publicly accessible. For example, the /ui and /lib folders are colocated inside the /app folder along with your routes.
* The <Layout /> component receives a children prop. This child can either be a page or another layout. 
* One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering which preserves client-side React state in the layout when transitioning between pages.
* You can use the root layout to modify your <html> and <body> tags, and add metadata

# 5: Navigating Between Pages

Learn how to navigate between dashboard pages using the `<Link>` component.
1. How to use the next/link component.
2. How to show an active link with the usePathname() hook.
3. How navigation works in Next.js.

* without using next/link(<Link />) there's a full page refresh on each page navigation!
* <Link> allows you to do client-side navigation with JavaScript.making it feel like a native web app.
* As you can see, the Link component is similar to using <a> tags, but instead of <a href="…">, you use <Link href="…">.
* Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work. This is also less code for the browser to parse, which makes your application faster.
* in production, whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background.
* to show active links import usePathname() hook from next/navigation and make that component to 'use client' them use clsx to highlight the active link

# 6: Setting Up Your Database

Let's create a database to start fetching real data!
1. Push your project to GitHub.
2. Set up a Vercel account and link your GitHub repo for instant previews and deployments.
3. Create and link your project to a Postgres database.
4. Seed the database with initial data.