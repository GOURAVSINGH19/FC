import { z } from "zod";

module.exports.authSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be at most 50 characters long"),

  lastname: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be at most 50 characters long"),

  picture: z.string().url("Invalid URL format for picture").optional(), // Picture is optional

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

try {
  authSchema.parse(exampleData);
  console.log("Data is valid!");
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Validation errors:", e.errors);
  } else {
    console.error("Unexpected error:", e);
  }
}
