import * as z from "zod";

//aqui toda a validação é feita e sera exportada ( pois nao irei usar aqui )
export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Tem que ter mais de 2 letras"}),
    username: z.string().min(2, {message: "Tem que ter mais de 2 letras"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Senha precisa ter pelo menos 8 caracteres"}),
});