/*
  Warnings:

  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectTasks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectTags" DROP CONSTRAINT "_ProjectTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectTags" DROP CONSTRAINT "_ProjectTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectTasks" DROP CONSTRAINT "_ProjectTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectTasks" DROP CONSTRAINT "_ProjectTasks_B_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ProjectTags";

-- DropTable
DROP TABLE "_ProjectTasks";

-- DropEnum
DROP TYPE "Status";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
