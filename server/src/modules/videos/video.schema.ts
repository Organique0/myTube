import { boolean, object, string, TypeOf } from "zod";

export const updateVideoSchema = {
  body: object({
    title: string(),
    description: string(),
    published: boolean()
  }),
  params: object({
    videoId: string()
  })
};

export type updateVideoBody = TypeOf<typeof updateVideoSchema.body>;
export type updateVideoParams = TypeOf<typeof updateVideoSchema.params>;
