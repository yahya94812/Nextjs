# Shadcn UI
* npx shadcn@latest init
* npx shadcn@latest add button //adds button comp at '/components/ui/button' use it by <Button>click me</Button>
* import { ThemeProvider } from "next-themes";
* <ThemeProvider //this is for theme (light/dark)
          attribute="class"
          defaultTheme="system" // This line sets the default theme
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>