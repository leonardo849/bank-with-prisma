import { ContaBancaria } from "@prisma/client";

export class ListaPessoasDTO {
    constructor(
        readonly id: string,
        readonly nome: string, readonly conta: ContaBancaria, readonly email: string,
        readonly created_at: Date, readonly updated_at: Date
    ) {}
}