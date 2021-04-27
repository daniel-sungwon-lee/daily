CREATE TABLE "routines" (
	"id" serial NOT NULL,
	"from" TIME NOT NULL,
	"to" TIME NOT NULL,
	"action" TEXT NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
