import { IsInt, IsUUID } from "class-validator";

export class CriaTransferenciaDTO {
    @IsInt()
    valor: number
    @IsUUID()
    contaGastadora: string;
    @IsUUID()
    contaRecebora: string
}