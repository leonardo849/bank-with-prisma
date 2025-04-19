import { Length, IsEmail } from "class-validator";

export class AtualizaPessoaDTO {
    @Length(10, 100, {message: "Seu nome tem que ficar entre 10 e 100 letras"})
    nome: string;

    @IsEmail()
    email: string;

}