import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const formSchema = z.object({
  file: z.instanceof(FileList)
    .refine((fileList) => fileList.length === 1, 'GPX file is required')
    .refine((files) => files?.[0]?.name.endsWith(".gpx"), "Only .gpx files are accepted.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB."),
  trimStart: z.coerce.number().positive({
    message: 'Start trim must be positive',
  }).optional(),
  trimEnd: z.coerce.number().positive({
    message: 'End trim must be positive',
  }).optional(),
});