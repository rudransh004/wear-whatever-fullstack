import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import { prisma } from '../../../lib/prisma'; // Importing your Prisma client

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  // 1. AUTHENTICATION GUARD: Ensure the user is logged in via Supabase
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized: You must be logged in to use the AI Stylist.' }), 
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. PRISMA TOKEN GUARD: Check if the user has AI credits left
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id } // Matches the Supabase Auth ID
  });

  if (!dbUser) {
    return new NextResponse(
      JSON.stringify({ error: 'User record not found in database.' }), 
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // If they have 0 credits and are NOT a pro user, block the request completely
  if (dbUser.aiCredits <= 0 && !dbUser.isProUser) {
    return new NextResponse(
      JSON.stringify({ error: 'RATE_LIMIT_EXCEEDED', message: 'You have used all your free AI tokens.' }), 
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. DEDUCT CREDIT: Subtract 1 token (only if they aren't a Pro user)
  if (!dbUser.isProUser) {
    await prisma.user.update({
      where: { id: user.id },
      data: { aiCredits: { decrement: 1 } }
    });
  }

  // 4. PROCESS CHAT: Safe to send request to Groq / LLaMA 3
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    system:
      'You are an edgy, highly helpful streetwear stylist for the luxury brand WearWhatever.in. Keep your responses concise, cool, direct, and focused on streetwear fashion, drops, and styling. Never use cringe corporate buzzwords.',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
  });
}