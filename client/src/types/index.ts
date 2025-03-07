import { z } from "zod";
import { registerFormSchema } from "@/schemas/forms";

export type RegisterFormData = z.infer<typeof registerFormSchema>;
