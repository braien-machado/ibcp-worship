import { z } from 'zod';

const KeyEnum = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G'], {
  invalid_type_error: '"key" available values are: "A", "B", "C", "D", "E", "F", "G".'
});
type KeyEnum = z.infer<typeof KeyEnum>;

const PeriodEnum = z.enum(['dia', 'noite'], {
  required_error: '"period" is a required field.',
  invalid_type_error: '"period" available values are: "dia" and "noite".'
});
type PeriodEnum = z.infer<typeof PeriodEnum>;

export const presentationCreateFormSchema = z.object({
  date: z.string().regex(
    /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
    '"date" must be a date string in the format YYYY-MM-dd.'
  ),
  period: PeriodEnum,
  songs: z.array(z.object({
    name: z.string().min(1, '"name" cannot be an empty string.'),
    author: z.string().min(1, '"author" cannot be an empty string.'),
    videoUrl: z.optional(z.string().min(1, '"author" cannot be an empty string.')),
    key: z.optional(KeyEnum),
  })).nonempty('"songs" must not be empty.')
});
