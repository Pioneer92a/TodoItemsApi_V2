/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    DROP COLUMN `token`,
    MODIFY `isLoggedIn` BOOLEAN NOT NULL DEFAULT true;
