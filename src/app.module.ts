import { Module } from '@nestjs/common';
import { PessoasModule } from './pessoas/pessoas.module';
import { ContasModule } from './contas/contas.module';

@Module({
  imports: [PessoasModule, ContasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
