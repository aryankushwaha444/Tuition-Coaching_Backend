/*
  Warnings:

  - Made the column `email` on table `student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `email` VARCHAR(100) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
