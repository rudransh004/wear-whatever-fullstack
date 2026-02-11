'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { prisma } from "../../lib/prisma" // Ensure this path is correct

export async function login(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Redirect back to login with an error message in the URL
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    }
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // 2. Sync with Prisma User table
  if (data.user) {
    try {
      await prisma.user.create({
        data: {
          id: data.user.id, // Links Supabase Auth ID to Prisma
          email: email,
        }
      })
    } catch (dbError) {
      console.error("Database sync failed:", dbError)
      // Note: User still exists in Supabase Auth even if Prisma fails
    }
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}