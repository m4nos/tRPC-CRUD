import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { todoRouter } from './routers/todoRouter';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
