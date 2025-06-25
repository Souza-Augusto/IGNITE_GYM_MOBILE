import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Digite um email válido')
    .transform((value) => value.toLowerCase()),
  password: z.string().min(1, 'Digite uma senha'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
