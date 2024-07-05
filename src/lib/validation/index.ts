import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "O nome precisa ter mais de 2 letras" }),
  username: z.string().min(2, { message: "O nome precisa ter mais de 2 letras" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "A Senha precisa ter mais de 8 digitos " }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "A Senha precisa ter mais de 8 digitos " }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "O nome precisa ter mais de 2 letras" }),
  username: z.string().min(2, { message: "O nome precisa ter mais de 2 letras" }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "No minimo  5 letras." }).max(2200, { message: "No maximo  2200  letras " }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "Este campo é obrigatorio" }).max(1000, { message: "No maximo 1000 letras." }),
  tags: z.string(),
});

// ============================================================
// EVENT
// ============================================================

export const EventValidation = z.object({
  title: z.string().min(2, { message: "O titulo precisa ter no minimo 2 caracteres" }),
  description: z.string().min(5, { message: "No minimo 5 caracteres" }),
  date: z.string().min(1, { message: "Campo Obrigatório" }),
  location: z.string().min(1, { message: "Campo Obrigatório" }),
  users: z.string(), 
  package: z.string(), 
});