CREATE TABLE "routines" (
	"id" serial NOT NULL,
	"from" DATETIME NOT NULL,
	"to" DATETIME NOT NULL,
	"action" TEXT NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
