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
* please refer doc tutorial it self

# 7: Fetching Data

Let's discuss the different ways you can fetch data from your database, including using APIs, SQL, and alternatives.
1. Learn about some approaches to fetching data: APIs, ORMs, SQL, etc.
2. How Server Components can help you access back-end resources more securely.
3. What network waterfalls are.
4. How to implement parallel data fetching using a JavaScript Pattern.
* Server Components support JavaScript Promises, providing a solution for asynchronous tasks like data fetching natively. You can use async/await syntax without needing useEffect, useState or other data fetching libraries.
* postgres.js library and SQL. There are a few reasons why we'll be using SQL
    * The postgres.js library provides protection against SQL injections
* we've kept all the data queries in the data.ts file, and you can import them into the components.
* By default, Next.js prerenders routes to improve performance, this is called Static Rendering. So if your data changes, it won't be reflected in your dashboard.
* A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.
* A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time (native JavaScript pattern) but what happens if one data request is slower than all the others. 

# 8: Static and Dynamic Rendering

Learn about the different rendering modes in Next.js.
1. What static rendering is and how it can improve your application's performance.
2. What dynamic rendering is and when to use it.
3. Different approaches to make your dashboard dynamic.
4. Simulate a slow data fetch to see what happens.
* With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when revalidating data.
* With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page).
* Request Time Information - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.
* Here, you've added an artificial 3-second delay to simulate a slow data fetch. The result is that now your whole page is blocked from showing UI to the visitor while the data is being fetched.
* With dynamic rendering, your application is only as fast as your slowest data fetch.

# 9: Streaming

Learn how to improve your user's experience by adding streaming.
1. What streaming is and when you might use it.
2. How to implement streaming with loading.tsx and Suspense.
3. What loading skeletons are.
4. What Next.js Route Groups are, and when you might use them.
5. Where to place React Suspense boundaries in your application.
* Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
* By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.
* loading.tsx is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.
* loading.tsx is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.
* Since <SideNav> is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
* The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).
* Any UI you add in loading.tsx will be embedded as part of the static file, and sent first. Then, the rest of the dynamic content will be streamed from the server to the client.
* We can change this with Route Groups. Create a new folder called /(overview) inside the dashboard folder. Then, move your loading.tsx and page.tsx files inside the folder.Now, the loading.tsx file will only apply to your dashboard overview page.
* Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path. So /dashboard/(overview)/page.tsx becomes /dashboard.
* you can also use route groups to separate your application into sections (e.g. (marketing) routes and (shop) routes) or by teams for larger applications.
* If you remember the slow data request, fetchRevenue(), this is the request that is slowing down the whole page. Instead of blocking your whole page, you can use Suspense to stream only this component and immediately show the rest of the page's UI.
* You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
* You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
* You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.
* Streaming and Server Components give us new ways to handle data fetching and loading states, ultimately with the goal of improving the end user experience.
<!-- take a look on this chapter again -->

# 10: Partial Prerendering

An early look into Partial Prerendering - a new experimental rendering model built with streaming.
* combine static rendering, dynamic rendering, and streaming in the same route with Partial Prerendering (PPR).
<!-- it is in experimental stage, not recommended, skip -->

# 11: Adding Search and Pagination

Learn how to implement search and pagination with Next.js APIs.
1. Learn how to use the Next.js APIs: useSearchParams, usePathname, and useRouter.
2. Implement search and pagination using URL search params.
* <Pagination/> allows users to navigate between pages of invoices.
* Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.
* As mentioned above, you'll be using URL search params to manage the search state. This pattern may be new if you're used to doing it with client side state.
* Server-side rendering: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
* Analytics and tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.
* These are the Next.js client hooks that you'll use to implement the search functionality:
    * useSearchParams- Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
    * usePathname - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.
    * useRouter - Enables navigation between routes within client components programmatically. There are multiple methods you can use.
* Capture the user's input.
* Update the URL with the search params.
* Keep the URL in sync with the input field.
* Update the table to reflect the search query.
* URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.
* Now that you have the query string. You can use Next.js's useRouter and usePathname hooks to update the URL.
* Import useRouter and usePathname from 'next/navigation', and use the replace method from useRouter() inside handleSearch:
* The URL is updated without reloading the page, thanks to Next.js's client-side navigation 
* If you search for a term, you'll update the URL, which will send a new request to the server, data will be fetched on the server, and only the invoices that match your query will be returned.
* pagination using URL params
* fetch the data ohttp://localhost:3000/n the server using server component and pass it to the client component as a prop.

# 12: Mutating Data

Learn how to mutate data with Server Actions.
1. What React Server Actions are and how to use them to mutate data.
2. How to work with forms and Server Components.
3. Best practices for working with the native FormData object, including type validation.
4. How to revalidate the client cache using the revalidatePath API.
5. How to create dynamic route segments with specific IDs.
* React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.
* In React, you can use the action attribute in the <form> element to invoke actions. The action will automatically receive the native FormData object, containing the captured data.
* Server Actions are also deeply integrated with Next.js caching. When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like revalidatePath and revalidateTag.
* By adding the 'use server', you mark all the exported functions within the file as Server Actions.
* You can also write Server Actions directly inside Server Components by adding "use server" inside the action. But for this course, we'll keep them all organized in a separate file. We recommend having a separate file for your actions.
* Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.
* input elements with type="number" actually return a string, not a number!
* Zod, a TypeScript-first validation library
* The amount field is specifically set to coerce (change) from a string to a number while also validating its type.
* Next.js has a client-side router cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.
* to clear this cache and trigger a new request to the server. You can do this with the revalidatePath function from Next.js
* to redirect the user back to the /dashboard/invoices page. You can do this with the redirect function from Next.js:

# 13: Handling Errors

Let's explore best practices for mutating data with forms, including error handling and accessibility.
*  how you can handle errors gracefully using JavaScript's try/catch statements and Next.js APIs for uncaught exceptions.
1. How to use the special error.tsx file to catch errors in your route segments, and show a fallback UI to the user.
2. How to use the notFound function and not-found file to handle 404 errors (for resources that don’t exist).
* The error.tsx file can be used to define a UI boundary for a route segment. It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.
* "use client" - error.tsx needs to be a Client Component.
* It accepts two props:
    * error: This object is an instance of JavaScript's native Error object.
    * reset: This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.
* Another way you can handle errors gracefully is by using the notFound function. While error.tsx is useful for catching uncaught exceptions, notFound can be used when you try to fetch a resource that doesn't exist.
* That's something to keep in mind, notFound will take precedence over error.tsx, so you can reach out for it when you want to handle more specific errors!

# 14: Improving Accessibility

Let's continue exploring ways to improve your user's experience. You'll learn about server-side form validation and improving accessibility.
<!-- i am skipping this chapter, it is not important for me -->

# 15: Adding Authentication

Your application is almost ready, in the next chapter, you'll learn how to add authentication to your application using NextAuth.js.
1. What is authentication.
2. How to add authentication to your app using NextAuth.js.
3. How to use Middleware to redirect users and protect your routes.
4. How to use React's useActionState to handle pending states and form errors.
* Authentication is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.
* Authorization is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.
* You'll notice the page imports <LoginForm />, which you'll update later in the chapter. This component is wrapped with React <Suspense> because it will access information from the incoming request (URL search params).
* Here, you're installing the beta version of NextAuth.js, which is compatible with Next.js 14+.
* Next, generate a secret key for your application. This key is used to encrypt cookies, ensuring the security of user sessions. You can do this by running the following command in your terminal: ```openssl rand -base64 32```
* For auth to work in production, you'll need to update your environment variables in your Vercel project too.
* Create an auth.config.ts file at the root of our project that exports an authConfig object. This object will contain the configuration options for NextAuth.js. 
* You can use the pages option to specify the route for custom sign-in, sign-out, and error pages. This is not required, but by adding signIn: '/login' into our pages option, the user will be redirected to our custom login page, rather than the NextAuth.js default page.
* Next, add the logic to protect your routes. This will prevent users from accessing the dashboard pages unless they are logged in.

