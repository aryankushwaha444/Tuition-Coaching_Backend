/*
  Warnings:

  - You are about to alter the column `address` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `password` VARCHAR(20) NULL,
    MODIFY `address` VARCHAR(100) NULL;
