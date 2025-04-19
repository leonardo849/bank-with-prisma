import { Body, Controller, Post, UsePipes, Get, Param, Put, Delete } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CriaPessoaDTO } from './dto/CriaPessoaDTO';
import { HashearSenhaPipe } from 'src/hashear-senha-pipe/hashear-senha-pipe.pipe';
import { AtualizaPessoaDTO } from './dto/atualizaPessoaDTO';

@Controller('/pessoas')
export class PessoasController {
    constructor(private pessoaService: PessoasService) {}

    @Post()
    async criaPessoa(@Body() {senha, ...dadosDoUsuario}: CriaPessoaDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string
    ) {
        const pessoa = await this.pessoaService.criaPessoa({...dadosDoUsuario, senha: senhaHasheada})
        return pessoa
    }

    @Get()
    async listaPessoas() {
        const pessoas = await this.pessoaService.listaPessoas()
        return pessoas
    }

    @Get('/:id')
    async listaPessoa(@Param('id') id: string) {
        const pessoa = await this.pessoaService.listaPessoa(id)
        return pessoa
    }

    @Put('/:id')
    async atualizaPessoa(@Param('id') id: string, @Body() AtualizaPessoaDTO: AtualizaPessoaDTO) {
        const pessoa = await this.pessoaService.atualizaPessoa(id, AtualizaPessoaDTO)
        return pessoa
    }

    @Delete('/:id')
    async apagaPessoa(@Param('id') id: string) {
        const pessoa = await this.pessoaService.apagaPessoa(id)
        return pessoa
    }

}
