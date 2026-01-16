# My School Dashboard

A modern school management dashboard built with Next.js.

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd myschool_dashboard
```

### Install dependencies

```bash
npm install --force
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Lesson 1 Recap

### Tech Stack Notes

- **Next.js**: A React framework that handles routing, server-side rendering, and full-stack features. Makes building web apps easier than plain React.
- **shadcn/ui**: A collection of pre-built UI components (buttons, forms, cards, etc.) that you can copy into your project. Like bootstrap but better.
- **TypeScript**: Very similar to Javascript, but adds Type Checking.
- **Tailwind CSS**: Takes care of styling.

### Things to remember

**1. Home Page Location**

- The main home page is at `app/page.tsx`
- In Next.js App Router, any `page.tsx` file becomes a route

**2. Adding Routes - How It Works**

- Next.js uses file-based routing: the folder structure in `app/` determines your URL paths
- To create a new route: create a folder with the route name, then add a `page.tsx` inside it
- Example: `app/login/page.tsx` becomes accessible at `/login`
- The `page.tsx` file must export a default component - that's what renders at that URL

**3. Server Pages vs Client Components - The Difference**

- **Server Components** (default):
  - Run only on the server, never sent to the browser
  - Can directly access databases, file system, backend APIs
  - Cannot use React hooks (useState, useEffect) or browser APIs
  - Better for performance - less JavaScript sent to client
  - All `page.tsx` files are Server Components by default
- **Client Components**:
  - Run in the browser (client-side)
  - Need `"use client"` directive at the top of the file
  - Can use React hooks and handle user interactions (onClick, onChange, etc.)
  - Necessary for forms, interactive UI, accessing browser APIs
  - Example: `LoginForm.tsx` needs to be a Client Component to handle form submission

#### Most of our code will be in client components. As we are using NextJS only for the front end.

### Next Class

- Review the login form implementation
- Set up a Django backend with REST framework for authentication

### Homework #1 (Due After Next Lesson)

- [ ] Create a registration page following the same pattern as the login page
