/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `uuid` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `uuid` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Task_uuid_key` ON `Task`(`uuid`);
