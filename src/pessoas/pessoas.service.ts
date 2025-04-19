import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {PrismaClient} from "@prisma/client"
import { CriaPessoaDTO } from './dto/CriaPessoaDTO';
import { ListaPessoasDTO } from './dto/listaPessoasDTO';
import { AtualizaPessoaDTO } from './dto/atualizaPessoaDTO';

@Injectable()
export class PessoasService {
    private prisma = new PrismaClient()
    constructor() {}

    async criaPessoa(dados: CriaPessoaDTO) {
        const pessoaComEsseEmail = await this.prisma.pessoa.findFirst({where:{email: dados.email}})
        if (pessoaComEsseEmail) {
            throw new ConflictException("Usuario com esse nick já existe")
        }
        await this.prisma.pessoa.create(
        {data: {email: dados.email, senha: dados.senha, nome: dados.nome, conta: {create: {saldo: 0}}}
        }, )
        const pessoa = await this.prisma.pessoa.findFirst({where:{email: dados.email}})
        return {
            mensagem: 'usuario criado',
            pessoa: {
                id: pessoa.id,
                nome: pessoa.nome
            }
        }
    }

    async listaPessoa(id: string) {
        const pessoa = await this.prisma.pessoa.findFirst({where:{id}, include:{conta: true}})
        if (!pessoa) {
            throw new NotFoundException("Pessoa não encontrado")
        }
        return new ListaPessoasDTO(pessoa.id, pessoa.nome, pessoa.conta, pessoa.email, pessoa.createdAt, pessoa.updatedAt)
    }

    async listaPessoas() {
        const lista = await this.prisma.pessoa.findMany({include:{conta: true}})
        const pessoas = lista.map(pessoa => new ListaPessoasDTO(pessoa.id, pessoa.nome, 
            pessoa.conta, pessoa.email, pessoa.createdAt, pessoa.updatedAt))
            return pessoas
    }
    async atualizaPessoa(id: string, AtualizaPessoaDTO: AtualizaPessoaDTO) {
        const pessoa = await this.prisma.pessoa.findFirst({where:{id}})
        if (!pessoa) {
            throw new NotFoundException("Pessoa não encontrado")
        }
        await this.prisma.pessoa.update({where: {id}, data:AtualizaPessoaDTO})
        return {
            message: 'atualizado'
        }
    }
    async apagaPessoa(id: string) {
        const pessoa = await this.prisma.pessoa.findFirst({where:{id}, include:{conta: true}})
        if (!pessoa) {
            throw new NotFoundException("Pessoa não encontrado")
        }
        await this.prisma.pessoa.delete({where:{id}})
        return {
            message: 'usuario apagado'
        }
    }
}
