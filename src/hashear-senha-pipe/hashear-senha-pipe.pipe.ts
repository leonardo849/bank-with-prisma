import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';


import * as bcrypt from "bcrypt"
import 'dotenv/config'
@Injectable()
export class HashearSenhaPipe implements PipeTransform {
  constructor() {}

  async transform(senha: string) {
    const sal = process.env.SALHASH

    const senhaHasheada = await bcrypt.hash(senha, sal!);

    return senhaHasheada;
  }
}