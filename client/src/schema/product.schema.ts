import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().min(0, { message: "Price must be at least 0" }),
  quantity: z
    .number()
    .int({ message: "Quantity must be a whole number" })
    .nonnegative({ message: "Quantity cannot be negative" }),

  category: z.string().min(1, "Category is required"),
  shipping: z.enum(["true", "false"]),
  photo: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        url: z.string(),
        public_alt: z.string().optional(),
      }),
    )
    .min(1, "At least one image is required"),
});
