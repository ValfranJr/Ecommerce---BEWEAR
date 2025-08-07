import z from "zod";

export const decreaseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseProductQuantitySchema = z.infer<
  typeof decreaseCartProductQuantitySchema
>;
