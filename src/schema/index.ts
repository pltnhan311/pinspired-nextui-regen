import { z } from 'zod';

export type FormData = {
  Email: string;
  Password: string;
};

export const RegisterSchema = z.object({
  Email: z
    .string()
    .min(1, {
      message: 'Please enter your email'
    })
    .email({
      message: 'Please enter a valid email'
    }),
  Password: z
    .string()
    .min(1, {
      message: 'Please enter your password'
    })
    .refine((password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password), {
      message: 'Password must be at least 8 characters, include at least 1 uppercase and 1 number'
    })
});

export type TRegisterFields = z.infer<typeof RegisterSchema>;

// export const LoginSchema = z.object({
//   Email: z.string().email({

//   })
// })
