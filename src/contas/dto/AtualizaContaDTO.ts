import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';


export class UpdateContaDto {
    @IsInt()
    saldo: number
}
