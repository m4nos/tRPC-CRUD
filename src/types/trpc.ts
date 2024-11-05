import type { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@/trpc/router';

export type Todo = inferRouterOutputs<AppRouter>['todo']['getTodos'][number];
