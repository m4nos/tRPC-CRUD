import { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/trpc/router';
import { createContext } from '@/trpc/context';

export const runtime = 'nodejs';

// The request handler using the new Next.js App Router's `fetchRequestHandler`
export async function POST(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
}

// Optional: If you want to handle GET requests for queries instead of mutations
export async function GET(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
}
