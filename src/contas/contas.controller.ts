import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContasService } from './contas.service';

import { UpdateContaDto } from './dto/AtualizaContaDTO';
import { CriaTransferenciaDTO } from './dto/CriaTransferenciaDTO';

@Controller('/contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  

  @Get()
  async findAll() {
    return await this.contasService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.contasService.findOne(id);
  }

  @Patch('/mudasaldo/:id')
  async update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return await this.contasService.update(id, updateContaDto);
  }

  @Post('/transferencias')
  async criaTransferencia(@Body() dados: CriaTransferenciaDTO) {
    return await this.contasService.transferencia(dados)
  }


}
