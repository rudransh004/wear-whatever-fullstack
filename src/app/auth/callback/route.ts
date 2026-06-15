import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: Request) {
  // 1. Grab the temporary code Google sent us from the URL
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // By default, send them to the Account Vault after login
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = await createClient();
    
    // 2. Exchange the temporary code for a secure, encrypted session cookie
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // 3. OAUTH SYNC: Because they logged in via Google, they might not exist in Prisma yet.
      // We use `upsert` to safely create them if they are new, or do nothing if they already exist.
      try {
        await prisma.user.upsert({
          where: { id: data.user.id },
          update: {}, // If they already exist, we don't need to update anything
          create: {
            id: data.user.id,
            email: data.user.email!,
            // We can even grab their Google name if it's available!
            name: data.user.user_metadata?.full_name || 'Anonymous Void Explorer',
          }
        });
      } catch (dbError) {
        console.error("Prisma sync error during OAuth:", dbError);
      }

      // 4. Send them successfully to the Account page
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 5. If someone tries to mess with the URL or the code is expired, send them back to login
  return NextResponse.redirect(`${origin}/login?error=Invalid_or_expired_login_link`);
}