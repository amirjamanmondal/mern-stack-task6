import { z } from "zod";

function userModelValidator(data, isSignup) {
  const userSchema = z.object({
    name:
      isSignup === true
        ? z
            .string()
            .min(1, { message: "Name is required" })
            .max(50, { message: "Name is too long" })
        : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(50, { message: "Password is too long" }),
    userType: z.enum(["admin", "customer", "seller", "deliveryBoy"], {
      message: "Invalid user type",
    }),
    phone:
      isSignup === true
        ? z.number().min(10, { message: "phone number should be 10 digits" })
        : z.number().optional(),
    address: z.string().optional(),
  });
  const validateData = userSchema.parse(data);
  return validateData;
}
export default userModelValidator;
