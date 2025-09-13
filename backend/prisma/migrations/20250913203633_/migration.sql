/*
  Warnings:

  - You are about to drop the `Alumno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Carrera` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Alumno" DROP CONSTRAINT "Alumno_carreraId_fkey";

-- DropTable
DROP TABLE "public"."Alumno";

-- DropTable
DROP TABLE "public"."Carrera";

-- CreateTable
CREATE TABLE "public"."alumnos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "carrera_id" INTEGER,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carreras" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "carreras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carreras_nombre_key" ON "public"."carreras"("nombre");

-- AddForeignKey
ALTER TABLE "public"."alumnos" ADD CONSTRAINT "alumnos_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "public"."carreras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
