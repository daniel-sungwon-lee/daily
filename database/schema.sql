CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "routines" (
	"id" serial NOT NULL,
	"userId" serial NOT NULL,
	"from" TIME NOT NULL,
	"to" TIME NOT NULL,
	"action" TEXT NOT NULL,
	CONSTRAINT "routines_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "todo" (
	"id" serial NOT NULL,
	"todoId" serial NOT NULL,
	"action" TEXT NOT NULL,
	"isComplete" BOOLEAN NOT NULL,
	CONSTRAINT "todo_pk" PRIMARY KEY ("todoId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "routines" ADD CONSTRAINT "routines_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "todo" ADD CONSTRAINT "todo_fk0" FOREIGN KEY ("id") REFERENCES "routines"("id");
