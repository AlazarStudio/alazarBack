-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT[],
    "position" TEXT NOT NULL,
    "telegram" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "vk" TEXT,
    "tiktok" TEXT,
    "behance" TEXT,
    "pinterest" TEXT,
    "artstation" TEXT,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseHome" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT[],
    "price" INTEGER,
    "website" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "CaseHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "budget" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CaseHomeDevelopers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseHomeCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseHomeDevelopers_AB_unique" ON "_CaseHomeDevelopers"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseHomeDevelopers_B_index" ON "_CaseHomeDevelopers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseHomeCategories_AB_unique" ON "_CaseHomeCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseHomeCategories_B_index" ON "_CaseHomeCategories"("B");

-- AddForeignKey
ALTER TABLE "_CaseHomeDevelopers" ADD CONSTRAINT "_CaseHomeDevelopers_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseHome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseHomeDevelopers" ADD CONSTRAINT "_CaseHomeDevelopers_B_fkey" FOREIGN KEY ("B") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseHomeCategories" ADD CONSTRAINT "_CaseHomeCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseHome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseHomeCategories" ADD CONSTRAINT "_CaseHomeCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
