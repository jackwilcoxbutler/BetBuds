-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "league_name" TEXT NOT NULL,
    "scoring_type" TEXT NOT NULL,
    "number_bets" INTEGER NOT NULL,
    "number_periods" INTEGER NOT NULL,
    "period_type" TEXT NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "max_number_users" INTEGER NOT NULL,
    "max_odds" INTEGER NOT NULL,
    "min_odds" INTEGER NOT NULL,
    "allow_ml" BOOLEAN NOT NULL,
    "allow_spread" BOOLEAN NOT NULL,
    "allow_total" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLeagueBet" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "leagueID" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "bet_type" TEXT NOT NULL,
    "line" DECIMAL(65,30) NOT NULL,
    "result" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLeagueBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "timeSent" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LeagueToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_LeagueToUser_AB_unique" ON "_LeagueToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LeagueToUser_B_index" ON "_LeagueToUser"("B");

-- AddForeignKey
ALTER TABLE "UserLeagueBet" ADD CONSTRAINT "UserLeagueBet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLeagueBet" ADD CONSTRAINT "UserLeagueBet_leagueID_fkey" FOREIGN KEY ("leagueID") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueToUser" ADD CONSTRAINT "_LeagueToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueToUser" ADD CONSTRAINT "_LeagueToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
