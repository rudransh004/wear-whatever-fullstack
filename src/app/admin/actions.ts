'use server'

import { cookies } from 'next/headers'

export async function verifyAdminPasscode(formData: FormData) {
  try {
    const rawInput = formData.get('passcode') as string
    const rawEnv = process.env.ADMIN_PASSCODE

    if (!rawEnv) {
      console.error("CRITICAL CONFIG FAULT: 'ADMIN_PASSCODE' is unbound in cloud environment.")
      return { success: false, error: "Server Configuration Fault: Clearance Key Unbound" }
    }

    // Sanitize both strings: remove accidental quotes, whitespace, and invisible line breaks
    const cleanInput = rawInput.replace(/['"]/g, '').trim()
    const cleanEnv = rawEnv.replace(/['"]/g, '').trim()

    if (cleanInput === cleanEnv) {
      const cookieStore = await cookies()
      
      // Injecting explicit domain path and lax security to survive cloud routing
      cookieStore.set('admin_session', 'verified', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return { success: true }
    }

    return { success: false, error: "Access Denied: Invalid Clearance Code" }
  } catch (err: any) {
    console.error("Auth Engine Exception:", err)
    return { success: false, error: "Internal Telemetry Exception" }
  }
}

export async function terminateAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return { success: true }
}