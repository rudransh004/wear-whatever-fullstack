'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { timingSafeEqual } from 'node:crypto'

export async function adminLogin(formData: FormData) {
  const inputPasscode = formData.get('passcode') as string

  // 1. Telemetry Check: Verify the Vercel Hypervisor actually passed the key
  const secretPasscode = process.env.ADMIN_PASSCODE
  
  if (!secretPasscode) {
    console.error('CRITICAL SECURITY HALT: ADMIN_PASSCODE is missing from Vercel Node Environment.')
    redirect('/admin-login?error=Server_Config_Missing')
  }

  // 2. Cryptographic Check: Convert to UTF-8 Buffers and trim invisible trailing cloud spaces
  const inputBuffer = Buffer.from(inputPasscode.trim(), 'utf8')
  const secretBuffer = Buffer.from(secretPasscode.trim(), 'utf8')

  let isVerified = false
  if (inputBuffer.length === secretBuffer.length) {
    // Constant-time comparison mathematically prevents CPU timing attacks
    isVerified = timingSafeEqual(inputBuffer, secretBuffer)
  }

  if (isVerified) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'verified', { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 
    })
    redirect('/admin')
  }
  
  redirect('/admin-login?error=Invalid_Code')
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin-login')
}