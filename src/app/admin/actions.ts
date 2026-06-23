'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function adminLogin(formData: FormData) {
  const passcode = formData.get('passcode') as string
  
  if (passcode === process.env.ADMIN_PASSCODE) {
    // Set a secure, HTTP-only cookie that lasts for 24 hours
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'verified', { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24 
    })
    redirect('/admin')
  }
  
  // Note: For a real app, you'd want to use useActionState to display this error, 
  // but for a secret admin portal, failing silently or redirecting is fine.
  redirect('/admin-login?error=Invalid_Code')
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin-login')
}