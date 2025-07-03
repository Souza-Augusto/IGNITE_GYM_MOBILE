import { validators } from '@utils/validators.utils';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Informe o nome de usuário.')
      .regex(
        /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/,
        'O nome não pode conter números ou caracteres especiais'
      ),

    email: z
      .string()
      .email('Digite um email válido')
      .transform((value) => value.toLowerCase()),
    password: z
      .string()
      .min(8, 'Sua senha deve ter pelo menos 8 caracteres')
      .refine((password) => validators.checkForUppercaseLetter(password), {
        message: 'Sua senha deve ter pelo menos 1 letra maiúscula',
      })
      .refine((password) => validators.checkForLowercaseLetter(password), {
        message: 'Sua senha deve ter pelo menos 1 letra minúscula',
      })
      .refine((password) => validators.checkForSpecialCharacter(password), {
        message: 'Sua senha deve ter pelo menos 1 caractere especial',
      })
      .refine((password) => validators.checkForNumber(password), {
        message: 'Sua senha deve ter pelo menos 1 número',
      }),
    password_confirmation: z.string().min(1, 'Confirme a sua senha'),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem',
        path: ['password_confirmation'],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
