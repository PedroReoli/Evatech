import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "O nome precisa ter no mínimo 2 caracteres." }),
  username: z.string().min(2, { message: "O nome de usuário precisa ter no mínimo 2 caracteres." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "O nome de usuário precisa ter no mínimo 2" }),
  username: z.string().min(2, { message: "O nome de usuário precisa ter no mínimo 2" }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "No mínimo 5 caracteres" }).max(2200, { message: "No máximo 2000 caracteres" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "Este campo é obrigatório" }).max(1000, { message: "No máximo 1000 caracteres" }),
  tags: z.string(),
});

