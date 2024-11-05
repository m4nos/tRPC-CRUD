import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import { Context } from '../context';

const t = initTRPC.context<Context>().create();

// Define the todo router
export const todoRouter = t.router({
  // Create a new todo
  createTodo: t.procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todos.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),

  // Get all todos
  getTodos: t.procedure.query(async ({ ctx }) => {
    return ctx.prisma.todos.findMany();
  }),

  // Update a todo
  updateTodo: t.procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todos.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          completed: input.completed,
        },
      });
    }),

  // Delete a todo
  deleteTodo: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.todos.delete({
        where: { id: input.id },
      });
    }),
});
