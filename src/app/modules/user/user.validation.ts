import { string, z } from 'zod';

const updateUserZodSchema = z
  .object({
    body: z.object({
      phoneNumber: z
        .string({
          required_error: 'Phone number is required',
        })
        .optional(),
      role: z
        .enum(['seller', 'buyer'] as [string, ...string[]], {
          required_error: 'Role is required',
        })
        .optional(),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .optional(),
      name: z
        .object({
          firstName: z
            .string({
              required_error: 'First Name is required',
            })
            .optional(),
          lastName: z
            .string({
              required_error: 'Last Name is required',
            })
            .optional(),
        })
        .optional(),
      address: z
        .string({
          required_error: 'Address is required',
        })
        .optional(),
      budget: z
        .number({
          required_error: 'Budget is required',
        })
        .optional(),
      income: z
        .number({
          required_error: 'Income is required',
        })
        .optional(),
    }),
  })
  .refine(data => data.body.phoneNumber, {
    message: 'Phone number already exists',
  });

export const UserValidation = {
  updateUserZodSchema,
};
