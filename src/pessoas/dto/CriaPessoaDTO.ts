import { IsEmail, IsStrongPassword, Length } from "class-validator";

export class CriaPessoaDTO {
    @Length(10, 100, {message: "Seu nome tem que ficar entre 10 e 100 letras"})
    nome: string;

    @IsEmail()
    email: string;

    @Length(6, 22)
    senha: string;
}