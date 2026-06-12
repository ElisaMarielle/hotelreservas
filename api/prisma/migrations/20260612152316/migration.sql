-- DropForeignKey
ALTER TABLE `reservas` DROP FOREIGN KEY `Reservas_quartosId_fkey`;

-- DropIndex
DROP INDEX `Reservas_quartosId_fkey` ON `reservas`;

-- AlterTable
ALTER TABLE `reservas` MODIFY `quartosId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_quartosId_fkey` FOREIGN KEY (`quartosId`) REFERENCES `Quartos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
