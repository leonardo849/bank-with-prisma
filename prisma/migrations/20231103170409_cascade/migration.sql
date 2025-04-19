-- DropForeignKey
ALTER TABLE "ContaBancaria" DROP CONSTRAINT "ContaBancaria_pessoaId_fkey";

-- AddForeignKey
ALTER TABLE "ContaBancaria" ADD CONSTRAINT "ContaBancaria_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
