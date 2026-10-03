CREATE TABLE "AiPodMemory" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "normalizedQuestion" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "nextStep" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "model" TEXT,
    "source" TEXT NOT NULL DEFAULT 'ai',
    "hits" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiPodMemory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AiPodMemory_language_normalizedQuestion_key"
ON "AiPodMemory"("language", "normalizedQuestion");

CREATE INDEX "AiPodMemory_language_createdAt_idx"
ON "AiPodMemory"("language", "createdAt");
