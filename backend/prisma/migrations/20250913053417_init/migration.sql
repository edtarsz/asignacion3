/*
  Warnings:

  - Added the required column `apellidos` to the `Alumno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Alumno" ADD COLUMN     "apellidos" TEXT NOT NULL;
