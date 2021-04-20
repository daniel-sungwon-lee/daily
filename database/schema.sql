CREATE TABLE "routines" (
	"id" serial NOT NULL,
	"from" TEXT NOT NULL,
	"to" TEXT NOT NULL,
	"action" TEXT NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
