# Complete Next.js Tutorial - Essential Concepts

## 1. Project Setup

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## 2. App Router (Next.js 13+)

### File-based Routing

```
app/
├── page.tsx              # Home page (/)
├── about/
│   └── page.tsx         # About page (/about)
├── blog/
│   ├── page.tsx         # Blog list (/blog)
│   └── [slug]/
│       └── page.tsx     # Dynamic route (/blog/post-1)
└── layout.tsx           # Root layout
```

### Root Layout

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

### Basic Page

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <p>This is the home page</p>
    </main>
  )
}
```

## 3. Server Components vs Client Components

### Server Component (Default)

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### Client Component

```tsx
// app/components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

## 4. Dynamic Routes

### Single Dynamic Segment

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return <h1>Post: {params.slug}</h1>
}

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### Catch-all Routes

```tsx
// app/shop/[...categories]/page.tsx
export default function Shop({ 
  params 
}: { 
  params: { categories: string[] } 
}) {
  return (
    <div>
      <h1>Categories: {params.categories.join(' / ')}</h1>
    </div>
  )
}
// Matches: /shop/a, /shop/a/b, /shop/a/b/c
```

## 5. Data Fetching

### Server-side Fetching

```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store' // Dynamic data
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <div>{/* render products */}</div>
}
```

### Revalidation

```tsx
// Revalidate every 60 seconds
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  })
  return res.json()
}

// Or set at page level
export const revalidate = 60
```

## 6. Loading & Error States

### Loading UI

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>
}
```

### Error Handling

```tsx
// app/blog/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## 7. Metadata & SEO

### Static Metadata

```tsx
// app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
}

export default function About() {
  return <h1>About</h1>
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(res => res.json())
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

## 8. Route Handlers (API Routes)

```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())
  
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Process the data
  const newPost = await createPost(body)
  
  return NextResponse.json(newPost, { status: 201 })
}
```

### Dynamic Route Handler

```tsx
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await fetchPost(params.id)
  return NextResponse.json(post)
}
```

## 9. Middleware

```tsx
// middleware.ts (root level)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

## 10. Server Actions

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // Database operation
  const post = await db.post.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')
  return post
}
```

```tsx
// app/new-post/page.tsx
import { createPost } from '../actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

## 11. Image Optimization

```tsx
import Image from 'next/image'

export default function Gallery() {
  return (
    <div>
      <Image
        src="/profile.jpg"
        alt="Profile"
        width={500}
        height={500}
        priority // Load eagerly
      />
      
      <Image
        src="https://example.com/photo.jpg"
        alt="Remote image"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}
```

## 12. Navigation

### Link Component

```tsx
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/first-post" prefetch={false}>
        Blog Post
      </Link>
    </nav>
  )
}
```

### Programmatic Navigation

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Login logic
    router.push('/dashboard')
    // router.back()
    // router.refresh()
  }
  
  return <form onSubmit={handleSubmit}>{/* form fields */}</form>
}
```

## 13. Environment Variables

```bash
# .env.local
DATABASE_URL=postgresql://localhost:5432/mydb
NEXT_PUBLIC_API_URL=https://api.example.com
```

```tsx
// Server components - all env variables available
const dbUrl = process.env.DATABASE_URL

// Client components - only NEXT_PUBLIC_ variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

## 14. Route Groups & Layouts

```
app/
├── (marketing)/
│   ├── layout.tsx       # Marketing layout
│   ├── page.tsx         # Home
│   └── about/page.tsx   # About
└── (dashboard)/
    ├── layout.tsx       # Dashboard layout
    └── settings/page.tsx
```

```tsx
// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <aside>Dashboard Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}
```

## 15. Streaming & Suspense

```tsx
import { Suspense } from 'react'

async function SlowComponent() {
  const data = await fetchSlowData()
  return <div>{data}</div>
}

export default function Page() {
  return (
    <div>
      <h1>Fast Content</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

## 16. Parallel Routes

```
app/
└── dashboard/
    ├── @analytics/page.tsx
    ├── @notifications/page.tsx
    ├── layout.tsx
    └── page.tsx
```

```tsx
// app/dashboard/layout.tsx
export default function Layout({
  children,
  analytics,
  notifications,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  notifications: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="grid">
        {analytics}
        {notifications}
      </div>
    </div>
  )
}
```

## 17. Intercepting Routes

```
app/
└── photos/
    ├── [id]/page.tsx
    └── (.)[id]/page.tsx  # Intercepts /photos/[id]
```

Useful for modals that can also be accessed directly via URL.

## Key Takeaways

- **App Router** uses file-based routing with server components by default
- **Server Components** for data fetching, **Client Components** for interactivity
- **Dynamic routes** use `[param]` syntax
- **Metadata** improves SEO
- **Route Handlers** replace API routes
- **Server Actions** enable server-side mutations
- **Image optimization** built-in with Next/Image
- **Streaming** with Suspense for progressive rendering