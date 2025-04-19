-- CreateTable
CREATE TABLE "Transferencia" (
    "id" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contaOrigemId" TEXT NOT NULL,
    "contaDestinoId" TEXT NOT NULL,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_contaOrigemId_fkey" FOREIGN KEY ("contaOrigemId") REFERENCES "ContaBancaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_contaDestinoId_fkey" FOREIGN KEY ("contaDestinoId") REFERENCES "ContaBancaria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
