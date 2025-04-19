import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { HashearSenhaPipe } from 'src/hashear-senha-pipe/hashear-senha-pipe.pipe';

@Module({
  providers: [PessoasService, HashearSenhaPipe],
  controllers: [PessoasController]
})
export class PessoasModule {}
