/*
  Warnings:

  - The primary key for the `Invitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `line` on the `UserLeagueBet` table. All the data in the column will be lost.
  - You are about to alter the column `result` on the `UserLeagueBet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `league_id` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventID` to the `UserLeagueBet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `UserLeagueBet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "UserLeagueBet" DROP CONSTRAINT "UserLeagueBet_leagueID_fkey";

-- DropForeignKey
ALTER TABLE "UserLeagueBet" DROP CONSTRAINT "UserLeagueBet_userID_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_pkey",
ADD COLUMN     "league_id" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invitation_id_seq";

-- AlterTable
ALTER TABLE "UserLeagueBet" DROP COLUMN "line",
ADD COLUMN     "Opponent" TEXT,
ADD COLUMN     "eventID" TEXT NOT NULL,
ADD COLUMN     "point" DOUBLE PRECISION,
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "team_name" DROP NOT NULL,
ALTER COLUMN "result" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "gameID" TEXT NOT NULL,
    "sportTitle" TEXT NOT NULL,
    "sportKey" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "awayML" INTEGER,
    "homeML" INTEGER,
    "awaySpreadPoint" DOUBLE PRECISION,
    "homeSpreadPoint" DOUBLE PRECISION,
    "awaySpreadPrice" INTEGER,
    "homeSpreadPrice" INTEGER,
    "totalPoint" DOUBLE PRECISION,
    "overPrice" INTEGER,
    "underPrice" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_gameID_key" ON "Event"("gameID");

-- AddForeignKey
ALTER TABLE "UserLeagueBet" ADD CONSTRAINT "UserLeagueBet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeagueBet" ADD CONSTRAINT "UserLeagueBet_leagueID_fkey" FOREIGN KEY ("leagueID") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeagueBet" ADD CONSTRAINT "UserLeagueBet_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
