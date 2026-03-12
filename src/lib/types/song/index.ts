import z from 'zod';

export const songZodObject = z.object({
	id: z.string(),
	href: z.string(),
	attributes: z.object({
		name: z.string(),
		artistName: z.string(),
		artwork: z.object({
			url: z.string()
		}),
		previews: z.array(
			z.object({
				url: z.string()
			})
		)
	})
});

export type SongObject = z.infer<typeof songZodObject>;
