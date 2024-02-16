/*
  Warnings:

  - You are about to drop the column `titulo` on the `poll` table. All the data in the column will be lost.
  - Added the required column `title` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poll` DROP COLUMN `titulo`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
