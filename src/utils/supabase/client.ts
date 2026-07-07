// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Create a variable to hold the client globally in the browser
let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  // If a client already exists, return it immediately (The Singleton Pattern)
  if (browserClient) {
    return browserClient
  }

  // Otherwise, create it for the first time
  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return browserClient
}