import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { UpdateContaDto } from './dto/AtualizaContaDTO';
import { PrismaClient } from '@prisma/client';
import { CriaTransferenciaDTO } from './dto/CriaTransferenciaDTO';

@Injectable()
export class ContasService {
  private prisma = new PrismaClient()
  constructor() {}
  async findAll() {
    const contas = this.prisma.contaBancaria.findMany()
    return contas
  }

  async findOne(id: string) {
    const conta = await this.prisma.contaBancaria.findUnique({where:{id}})
    if (!conta) {
      throw new NotFoundException("Conta não achada kk")
    }
    return conta
  }

  async update(id: string, updateContaDto: UpdateContaDto) {
    const conta = await this.prisma.contaBancaria.findUnique({where:{id}})
    if (!conta) {
      throw new NotFoundException("Conta não achada kk")
    }
    await this.prisma.contaBancaria.update({where:{id}, data:updateContaDto})
    return {
      message: 'atualiazdo'
    }
  }

  async transferencia(dados: CriaTransferenciaDTO) {
    return await this.prisma.$transaction(async (tx) => {
      const contaGastadora = await tx.contaBancaria.findUnique({where:{id:dados.contaGastadora}})
      if (!contaGastadora) {
        throw new NotFoundException("Conta gastadora não existe")
      }
      if (contaGastadora.saldo < dados.valor) {
        throw new UnauthorizedException("Deixa de ser mercenario")
      }
      const contaRecebora = await tx.contaBancaria.findUnique({where:{id:dados.contaRecebora}})
      if (!contaRecebora) {
        throw new NotFoundException("Conta recebora não existe")
      }
      await tx.contaBancaria.update({where:{id:dados.contaGastadora}, data: {
        saldo: {
          decrement: dados.valor
        }
      }})
      await tx.contaBancaria.update({where:{id:dados.contaRecebora}, data:{saldo:{increment:dados.valor}}})
      await tx.transferencia.create({data:{valor: dados.valor, contaDestinoId: dados.contaRecebora, contaOrigemId: dados.contaGastadora}})
      return {
        message: 'foi'
      }
    });
  }
}
